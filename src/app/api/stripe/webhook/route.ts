import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe/client";
import { createClient } from "@supabase/supabase-js";

// Use service role for webhook — no user context
function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

async function upsertProfile(
  supabaseUserId: string,
  stripeCustomerId: string,
  tier: "free" | "plus" | "pro" | "academy",
  stripeSubscriptionId: string | null
) {
  const supabase = createAdminClient();
  await supabase.from("profiles").upsert(
    {
      id: supabaseUserId,
      stripe_customer_id: stripeCustomerId,
      subscription_tier: tier,
      stripe_subscription_id: stripeSubscriptionId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );
}

function tierFromPrice(priceId: string): "plus" | "pro" | "academy" {
  if (priceId === process.env.STRIPE_ACADEMY_PRICE_ID) return "academy";
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return "pro";
  return "plus";
}

export async function POST(request: Request) {
  const body = await request.text();
  const headerStore = await headers();
  const signature = headerStore.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.supabase_user_id;
        const tier = session.metadata?.tier as "plus" | "pro" | "academy";
        if (userId && session.customer && session.subscription) {
          await upsertProfile(
            userId,
            session.customer as string,
            tier,
            session.subscription as string
          );
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Look up user by stripe_customer_id
        const supabase = createAdminClient();
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          const priceId = subscription.items.data[0]?.price?.id;
          const isActive =
            subscription.status === "active" ||
            subscription.status === "trialing";
          const tier = isActive && priceId ? tierFromPrice(priceId) : "free";
          await upsertProfile(
            profile.id,
            customerId,
            tier,
            subscription.id
          );
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const supabase = createAdminClient();
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await upsertProfile(profile.id, customerId, "free", null);
        }
        break;
      }

      case "invoice.payment_succeeded": {
        // Subscription renewal succeeded — no action needed,
        // subscription.updated handles tier
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const supabase = createAdminClient();
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          // Downgrade on payment failure
          await upsertProfile(profile.id, customerId, "free", null);
        }
        break;
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
