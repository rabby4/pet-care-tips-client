"use server"
import envConfig from "@/src/config/envConfig"
import axiosInstance from "@/src/lib/AxiosInstance"
import { revalidateTag } from "next/cache"
import { FieldValues } from "react-hook-form"

export const getAllPosts = async () => {
	const fetchOptions = {
		next: {
			tags: ["posts"],
		},
	}
	const res = await fetch(`${envConfig.baseApi}/posts`, fetchOptions)
	const data = await res.json()

	return data
}

export const getSinglePost = async (postId: string) => {
	let fetchOptions = {}

	fetchOptions = {
		cache: "no-store",
	}

	const res = await fetch(`${envConfig.baseApi}/posts/${postId}`, fetchOptions)

	if (!res.ok) {
		throw new Error("Failed to fetch data")
	}

	return res.json()
}

export const upVote = async (postId: string) => {
	try {
		await axiosInstance.post(`${envConfig.baseApi}/upvote`, {
			post: postId,
		})
		revalidateTag("upvotes")
	} catch (error: any) {
		throw new Error(error)
	}
}

export const getUpVoteCount = async (postId: string) => {
	const fetchOptions = {
		next: {
			tags: ["upvotes"],
		},
	}
	const res = await fetch(`${envConfig.baseApi}/upvote/${postId}`, fetchOptions)

	const data = await res.json()

	return data
}

export const downVote = async (postId: string) => {
	try {
		await axiosInstance.post(`${envConfig.baseApi}/downvote`, {
			post: postId,
		})
		revalidateTag("downvote")
	} catch (error: any) {
		throw new Error(error)
	}
}

export const getDownVoteCount = async (postId: string) => {
	const fetchOptions = {
		next: {
			tags: ["downvotes"],
		},
	}
	const res = await fetch(
		`${envConfig.baseApi}/downvote/${postId}`,
		fetchOptions
	)

	const data = await res.json()

	return data
}

export const commentOnPost = async (formData: FieldValues) => {
	try {
		await axiosInstance.post("/comments", formData)

		revalidateTag("comments")
	} catch (error: any) {
		throw new Error(error)
	}
}

export const getPostComments = async (postId: string) => {
	const fetchOptions = {
		next: {
			tags: ["comments"],
		},
	}
	const res = await fetch(
		`${envConfig.baseApi}/comments/${postId}`,
		fetchOptions
	)

	const data = await res.json()

	return data
}
