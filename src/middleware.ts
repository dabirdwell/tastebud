import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PLUS_ROUTES = ["/mentors", "/planner", "/pantry", "/shopping"];
const PRO_ROUTES = ["/vr-experiences", "/custom-mentor"];
const ACADEMY_ROUTES = ["/academy"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only gate paid-tier routes
  const isPlusRoute = PLUS_ROUTES.some((r) => pathname.startsWith(r));
  const isProRoute = PRO_ROUTES.some((r) => pathname.startsWith(r));
  const isAcademyRoute = ACADEMY_ROUTES.some((r) => pathname.startsWith(r));

  if (!isPlusRoute && !isProRoute && !isAcademyRoute) {
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

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/mentors/:path*",
    "/planner/:path*",
    "/pantry/:path*",
    "/shopping/:path*",
    "/vr-experiences/:path*",
    "/custom-mentor/:path*",
    "/academy/:path*",
  ],
};
