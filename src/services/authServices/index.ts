"use server"

import axiosInstance from "@/src/lib/AxiosInstance"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const registerUser = async (userData: FieldValues) => {
	try {
		const { data } = await axiosInstance.post("/auth/signup", userData)

		if (data.success) {
			cookies().set("accessToken", data?.data?.accessToken)
		}

		return data
	} catch (error: any) {
		throw new Error(error)
	}
}
export const loginUser = async (userData: FieldValues) => {
	try {
		const { data } = await axiosInstance.post("/auth/login", userData)

		if (data.success) {
			cookies().set("accessToken", data?.data?.accessToken)
		}

		return data
	} catch (error: any) {
		throw new Error(error)
	}
}

export const logOut = () => {
	cookies().delete("accessToken")
}

export const getCurrentUser = async () => {
	const accessToken = cookies().get("accessToken")?.value

	let decodedToken = null

	if (accessToken) {
		decodedToken = await jwtDecode(accessToken)

		return {
			_id: decodedToken._id,
			email: decodedToken.email,
			role: decodedToken.role,
		}
	}

	return decodedToken
}
