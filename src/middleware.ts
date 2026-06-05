import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"

const AuthRoutes = ["/login", "/register"]

type Role = keyof typeof roleBaseRoutes

const roleBaseRoutes = {
	user: [/^\/profile/],
	admin: [/^\/admin/, /^\/profile/],
	superAdmin: [/^\/admin/, /^\/profile/],
}

type DecodedToken = {
	role?: string
	exp?: number
}

// Decode the token locally instead of calling the backend on every navigation.
// This is only for UX routing - the API independently verifies every request,
// so a tampered token still cannot access any protected data.
const getUserFromRequest = (request: NextRequest): DecodedToken | null => {
	const token = request.cookies.get("accessToken")?.value

	if (!token) return null

	try {
		const decoded = jwtDecode<DecodedToken>(token)

		// treat an expired token as logged out
		if (decoded.exp && decoded.exp * 1000 < Date.now()) return null

		return decoded
	} catch {
		return null
	}
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const user = getUserFromRequest(request)

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
	// /admin/:path* is required - without it /admin/users, /admin/payments
	// and /admin/all-posts would bypass the role check entirely
	matcher: [
		"/profile",
		"/profile/:page*",
		"/admin",
		"/admin/:path*",
		"/login",
		"/register",
	],
}
