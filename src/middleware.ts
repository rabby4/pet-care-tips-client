import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getCurrentUser } from "./services/authServices"

const AuthRoutes = ["/login", "/register"]

type Role = keyof typeof roleBaseRoutes

const roleBaseRoutes = {
	user: [/^\/profile/],
	admin: [/^\/admin/, /^\/profile/],
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const user = await getCurrentUser()

	if (!user) {
		if (AuthRoutes.includes(pathname)) {
			return NextResponse.next()
		} else {
			return NextResponse.redirect(
				new URL(`/login?redirect=${pathname}`, request.url)
			)
		}
	}

	if (user?.role && roleBaseRoutes[user.role as Role]) {
		const routes = roleBaseRoutes[user.role as Role]

		if (routes.some((route) => route.test(pathname))) {
			return NextResponse.next()
		}
	}

	return NextResponse.redirect(new URL("/", request.url))
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/profile", "/profile/:page*", "/admin", "/login", "/register"],
}
