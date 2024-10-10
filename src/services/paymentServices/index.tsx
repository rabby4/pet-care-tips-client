"use server"

import axiosInstance from "@/src/lib/AxiosInstance"

export const createPayment = async (payData: any) => {
	try {
		const { data } = await axiosInstance.post("/payments/monetization", {
			email: payData.email,
			amount: payData.amount,
		})

		console.log(payData)

		return data
	} catch (error: any) {
		console.log(error.response.data)
	}
}
