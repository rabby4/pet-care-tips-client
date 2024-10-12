/* eslint-disable no-console */
"use server"

import envConfig from "@/src/config/envConfig"
import axiosInstance from "@/src/lib/AxiosInstance"
import { revalidateTag } from "next/cache"

export const createPayment = async (payData: any) => {
	try {
		const { data } = await axiosInstance.post("/payments/monetization", {
			email: payData.email,
			amount: payData.amount,
		})

		revalidateTag("payment")

		return data
	} catch (error: any) {
		console.log(error.response.data)
	}
}
export const getPaymentHistory = async () => {
	const fetchOptions = {
		next: {
			tags: ["payment"],
		},
	}
	const res = await fetch(`${envConfig.baseApi}/payments`, fetchOptions)

	const data = await res.json()

	return data.data
}
