import { useMutation } from "@tanstack/react-query"
import {
	forgetPassword,
	loginUser,
	registerUser,
	resetPassword,
	updateUser,
} from "../services/authServices"
import { FieldValues } from "react-hook-form"
import { toast } from "sonner"

export const useRegistrations = () => {
	return useMutation<any, Error, FieldValues>({
		mutationKey: ["USER_REGISTER"],
		mutationFn: async (userData) => await registerUser(userData),
		onSuccess: () => {
			toast.success(`user registration success!`)
		},
		onError: (error) => toast.error(error.message),
	})
}

export const useLogin = () => {
	return useMutation<any, Error, FieldValues>({
		mutationKey: ["USER_LOGIN"],
		mutationFn: async (userData) => await loginUser(userData),
		onSuccess: () => {
			toast.success(`user logged in success!`)
		},
		onError: (error) => toast.error(error.message),
	})
}

export const useForgetPassword = () => {
	return useMutation<any, Error, FieldValues>({
		mutationKey: ["USER_FORGET_PASSWORD"],
		mutationFn: async (userData) => await forgetPassword(userData),
		onSuccess: () => {
			toast.success(`Check your email and set new password!`)
		},
		onError: (error) => toast.error(error.message),
	})
}

export const useResetPassword = () => {
	return useMutation<any, Error, FieldValues>({
		mutationKey: ["resetPassword"],
		mutationFn: async (resetData) => await resetPassword(resetData),
		onSuccess: () => {
			toast.success("Password Reset successful")
		},
		onError: (error: any) => {
			toast.error("Password Reset failed")
		},
	})
}

export const useUpdateUser = () => {
	return useMutation<any, Error, FieldValues>({
		mutationKey: ["USER_REGISTER"],
		mutationFn: async (userInfo) => await updateUser(userInfo),
		onSuccess: () => {
			toast.success(`user info updated successfully!`)
		},
		onError: (error) => toast.error(error.message),
	})
}
