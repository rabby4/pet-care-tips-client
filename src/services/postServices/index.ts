"use server"
import envConfig from "@/src/config/envConfig"
import axiosInstance from "@/src/lib/AxiosInstance"

// get all posts from the server
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

// get a single post from the server
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

// add upvote for post
export const upVote = async (postId: string) => {
	try {
		await axiosInstance.post(`${envConfig.baseApi}/upvote`, {
			post: postId,
		})
	} catch (error: any) {
		throw new Error(error)
	}
}

// get upvote count
export const getUpVoteCount = async (postId: string) => {
	try {
		const { data } = await axiosInstance.get(
			`${envConfig.baseApi}/upvote/${postId}`
		)

		console.log(data)
	} catch (error: any) {
		throw new Error(error)
	}
}

// add downvote for post
export const downVote = async (postId: string) => {
	try {
		await axiosInstance.post(`${envConfig.baseApi}/upvote`, {
			post: postId,
		})
	} catch (error: any) {
		throw new Error(error)
	}
}
