"use server"

import envConfig from "@/src/config/envConfig"

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
