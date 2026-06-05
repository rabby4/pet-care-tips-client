"use server"

import envConfig from "@/src/config/envConfig"
import axiosInstance from "@/src/lib/AxiosInstance"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

// the backend derives the paying user from the auth token and uses a fixed
// server-side price, so no payment data needs to be sent from the client
export const createPayment = async () => {
	try {
		const { data } = await axiosInstance.post("/payments/monetization", {})

		revalidateTag("payment")

		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(
			error?.response?.data?.message || error?.message || "Payment failed!"
		)
	}
}

export const getPaymentHistory = async () => {
	const accessToken = cookies().get("accessToken")?.value

	const res = await fetch(`${envConfig.baseApi}/payments`, {
		headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
		cache: "no-store",
	})

	const data = await res.json()

	return data.data
}
