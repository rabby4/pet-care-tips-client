"use server"
import envConfig from "@/src/config/envConfig"
import axiosInstance from "@/src/lib/AxiosInstance"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

// pull the real message out of an axios/fetch error instead of "[object Object]"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorMessage = (error: any, fallback: string) =>
	error?.response?.data?.message || error?.message || fallback

// the auth cookie is httpOnly so page scripts (and XSS) can't read the token
const cookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax" as const,
	path: "/",
	maxAge: 60 * 60 * 24 * 7, // matches the access token lifetime (7 days)
}

// attach the token to plain fetch calls
const authHeaders = (): Record<string, string> => {
	const accessToken = cookies().get("accessToken")?.value

	return accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
}

export const registerUser = async (userData: FieldValues) => {
	try {
		const { data } = await axiosInstance.post("/auth/signup", userData)

		if (data.success && data?.data?.accessToken) {
			cookies().set("accessToken", data.data.accessToken, cookieOptions)
		}
		revalidateTag("user")

		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "User registration failed!"))
	}
}

export const loginUser = async (userData: FieldValues) => {
	try {
		const { data } = await axiosInstance.post("/auth/login", userData)

		if (data.success && data?.data?.accessToken) {
			cookies().set("accessToken", data.data.accessToken, cookieOptions)
		}
		revalidateTag("user")

		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "Login failed!"))
	}
}
export const forgetPassword = async (userData: FieldValues) => {
	try {
		const { data } = await axiosInstance.post("/auth/forget-password", userData)

		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "Request failed!"))
	}
}

export const resetPassword = async (resetData: FieldValues) => {
	const res = await fetch(`${envConfig.baseApi}/auth/reset-password`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${resetData.token}`,
		},
		body: JSON.stringify({
			email: resetData.email,
			newPassword: resetData.newPassword,
		}),
	})

	const data = await res.json().catch(() => null)

	// surface backend failures so the UI doesn't show a false success toast
	if (!res.ok || !data?.success) {
		throw new Error(data?.message || "Password reset failed!")
	}

	return data
}

export const logOut = async () => {
	cookies().delete("accessToken")
	revalidateTag("user")
}

export const getCurrentUser = async () => {
	const accessToken = cookies().get("accessToken")?.value

	let user = null

	if (accessToken) {
		const res = await fetch(`${envConfig.baseApi}/auth/me`, {
			headers: { Authorization: `Bearer ${accessToken}` },
			// never shared-cache a per-user auth response across requests;
			// it is still memoized within a single render pass
			cache: "no-store",
		})

		if (res.ok) {
			const data = await res.json()

			user = data?.data
		}
	}

	return user
}

export const updateUser = async (userInfo: FieldValues) => {
	try {
		const { data } = await axiosInstance.patch(
			`/auth/${userInfo.id}`,
			userInfo.formData
		)

		revalidateTag("user")

		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "User info update failed!"))
	}
}

// public list: the backend only returns safe fields (name/image/...) to
// non-admins; admins receive the full data for the dashboard
export const getAllUsers = async () => {
	try {
		const res = await fetch(`${envConfig.baseApi}/auth`, {
			headers: authHeaders(),
			cache: "no-store",
		})
		const data = await res.json()

		return data.data
	} catch {
		return []
	}
}

export const deleteUser = async (userId: string) => {
	try {
		const res = await axiosInstance.delete(`/auth/${userId}`)

		revalidateTag("user")

		return res.data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "User delete failed!"))
	}
}
