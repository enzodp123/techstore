import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    // Create an unmodified response
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Initialize Supabase client for edge middleware
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Fetching user to check auth status
    const { data: { user } } = await supabase.auth.getUser()

    const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')
    const adminEmail = process.env.ADMIN_EMAIL

    // Ensure only the designated admin can access ANY route within /dashboard
    if (isDashboardRoute) {
        if (!user || user.email !== adminEmail) {
            // Redirect unauthorized users to the login page
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
