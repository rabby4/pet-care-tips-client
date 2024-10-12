/* eslint-disable no-console */
"use server"
import envConfig from "@/src/config/envConfig"
import axiosInstance from "@/src/lib/AxiosInstance"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const registerUser = async (userData: FieldValues) => {
	try {
		const { data } = await axiosInstance.post("/auth/signup", userData)

		if (data.success) {
			cookies().set("accessToken", data?.token)
		}
		revalidateTag("user")

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
		revalidateTag("user")

		return data
	} catch (error: any) {
		throw new Error(error)
	}
}
export const forgetPassword = async (userData: FieldValues) => {
	try {
		const { data } = await axiosInstance.post("/auth/forget-password", userData)

		return data
	} catch (error: any) {
		throw new Error(error)
	}
}

export const resetPassword = async (resetData: FieldValues) => {
	try {
		await fetch(`${envConfig.baseApi}/auth/reset-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: resetData.token,
			},
			body: JSON.stringify({
				email: resetData.email,
				newPassword: resetData.newPassword,
			}),
		})
	} catch (error: any) {
		console.log(error.response.data)
	}
}

export const logOut = async () => {
	cookies().delete("accessToken")
}

export const getCurrentUser = async () => {
	const fetchOptions: any = {
		next: {
			tags: ["user"],
		},
	}
	const accessToken = cookies().get("accessToken")?.value

	let user = null

	if (accessToken) {
		const res = await fetch(`${envConfig.baseApi}/auth/me`, {
			headers: { Authorization: accessToken },
			...fetchOptions,
		})

		const data = await res.json()

		user = data?.data
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
	} catch (error: any) {
		throw new Error(error)
	}
}

export const getAllUsers = async () => {
	try {
		const res = await fetch(`${envConfig.baseApi}/auth`)
		const data = await res.json()

		return data.data
	} catch (error) {
		console.log(error)
	}
}

export const deleteUser = async (userId: string) => {
	try {
		const res = await axiosInstance.delete(`/auth/${userId}`)

		revalidateTag("user")

		return res.data
	} catch (error) {
		console.log(error)
	}
}
