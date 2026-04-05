import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type Tier = "free" | "plus" | "pro" | "academy";

const TIER_RANK: Record<Tier, number> = {
  free: 0,
  plus: 1,
  pro: 2,
  academy: 3,
};

const ROUTE_TIERS: { routes: string[]; required: Tier }[] = [
  { routes: ["/mentors", "/planner", "/pantry", "/shopping"], required: "plus" },
  { routes: ["/curriculum", "/challenges"], required: "pro" },
  { routes: ["/academy", "/coaching"], required: "academy" },
];

function requiredTierForPath(pathname: string): Tier | null {
  for (const { routes, required } of ROUTE_TIERS) {
    if (routes.some((r) => pathname.startsWith(r))) return required;
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requiredTier = requiredTierForPath(pathname);
  if (!requiredTier) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Check subscription tier from profiles table
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier")
    .eq("id", user.id)
    .single();

  const userTier: Tier = (profile?.subscription_tier as Tier) || "free";

  if (TIER_RANK[userTier] < TIER_RANK[requiredTier]) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("upgrade", requiredTier);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/mentors/:path*",
    "/planner/:path*",
    "/pantry/:path*",
    "/shopping/:path*",
    "/curriculum/:path*",
    "/challenges/:path*",
    "/academy/:path*",
    "/coaching/:path*",
  ],
};
