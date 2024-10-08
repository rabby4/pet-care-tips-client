import { useMutation } from "@tanstack/react-query"
import {
	getAllUsers,
	loginUser,
	registerUser,
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
