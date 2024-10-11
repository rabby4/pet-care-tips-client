"use server"
import { TFollowing } from "@/src/components/modules/home/Following"
import envConfig from "@/src/config/envConfig"
import axiosInstance from "@/src/lib/AxiosInstance"
import { revalidateTag } from "next/cache"
import { FieldValues } from "react-hook-form"

export const createPost = async (formData: FormData): Promise<any> => {
	try {
		const { data } = await axiosInstance.post("/posts", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})

		revalidateTag("posts")

		return data
	} catch (error: any) {
		throw new Error("Failed to create post")
	}
}

export const updatePostPON = async (id: string, formData: FormData) => {
	try {
		const { data } = await axiosInstance.patch(`/posts/${id}`, formData)

		revalidateTag("posts")

		return data
	} catch (error: any) {
		throw new Error("Failed to update post")
	}
}

export const getAllPosts = async (category?: string, searchQuery?: string) => {
	const fetchOptions = {
		next: {
			tags: ["posts"],
		},
	}

	const params = new URLSearchParams()

	if (category) {
		params.append("category", category)
	}
	if (searchQuery) {
		params.append("search", searchQuery)
	}

	try {
		const res = await fetch(
			`${envConfig.baseApi}/posts?${params.toString()}`,
			fetchOptions
		)

		if (!res.ok) {
			throw new Error(`Failed to fetch posts: ${res.statusText}`)
		}

		const contentType = res.headers.get("content-type")

		if (contentType && contentType.includes("application/json")) {
			const data = await res.json()

			return data
		} else {
			await res.text()
			throw new Error("Response was not JSON")
		}
	} catch (error: any) {
		return { error: error.message }
	}
}

export const searchItems = async (searchTerm: string) => {
	try {
		const res = await axiosInstance.get(`/posts?search=${searchTerm}`)

		return res.data
	} catch (error) {
		throw new Error("Failed to search items")
	}
}

// export const getAllPosts = async () => {
// 	const fetchOptions = {
// 		next: {
// 			tags: ["posts"],
// 		},
// 	}
//
// 	try {
// 		// 		const params = new URLSearchParams()
// 		//
// 		// 		if (args) {
// 		// 			args.forEach((item: any) => {
// 		// 				params.append(item.name, item.value as string)
// 		// 			})
// 		// 		}
//
// 		const res = await fetch(`${envConfig.baseApi}/posts`, fetchOptions)
//
// 		if (!res.ok) {
// 			throw new Error(`Failed to fetch posts: ${res.statusText}`)
// 		}
//
// 		const contentType = res.headers.get("content-type")
//
// 		if (contentType && contentType.includes("application/json")) {
// 			const data = await res.json()
//
// 			return data
// 		} else {
// 			await res.text()
//
// 			throw new Error("Response was not JSON")
// 		}
// 	} catch (error: any) {
// 		return { error: error.message }
// 	}
// }

export const getPostsForUser = async (userId: string) => {
	const fetchOptions = {
		next: {
			tags: ["posts"],
		},
	}
	const res = await fetch(`${envConfig.baseApi}/posts/${userId}`, fetchOptions)
	const data = await res.json()

	return data
}

// export const getSearchPosts = async (search: string) => {
// 	const fetchOptions = {
// 		next: {
// 			tags: ["posts"],
// 		},
// 	}
// 	const res = await fetch(
// 		`${envConfig.baseApi}/posts?search=${search}`,
// 		fetchOptions
// 	)
// 	const data = await res.json()
//
// 	return data
// }

export const getSinglePost = async (postId: string) => {
	let fetchOptions = {}

	fetchOptions = {
		cache: "no-store",
	}

	const res = await fetch(
		`${envConfig.baseApi}/posts/post/${postId}`,
		fetchOptions
	)

	if (!res.ok) {
		throw new Error("Failed to fetch data")
	}
	const data = await res.json()

	return data.data
}

export const deletePost = async (postId: string) => {
	try {
		const res = await axiosInstance.delete(`/posts/${postId}`)

		revalidateTag("posts")

		return res.data
	} catch (error) {
		console.log(error)
	}
}

export const upVote = async (votesInfo: any) => {
	try {
		await axiosInstance.post(`${envConfig.baseApi}/upvote`, votesInfo)
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

export const downVote = async (votesInfo: any) => {
	try {
		await axiosInstance.post(`${envConfig.baseApi}/downvote`, votesInfo)

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

export const updateComment = async (formData: any) => {
	try {
		await axiosInstance.patch(`/comments/${formData.id}`, {
			content: formData.content,
		})

		revalidateTag("comments")
	} catch (error: any) {
		throw new Error(error)
	}
}

export const deleteComment = async (commentId: string) => {
	try {
		const res = await axiosInstance.delete(`/comments/${commentId}`)

		revalidateTag("comments")

		return res.data
	} catch (error) {
		console.log(error)
	}
}

export const addFollowing = async (formData: TFollowing) => {
	try {
		await axiosInstance.post(`/following`, formData)

		revalidateTag("following")
	} catch (error: any) {
		throw new Error("You already followed this user!")
	}
}

export const unFollow = async (followData: TFollowing) => {
	try {
		await axiosInstance.delete(`/following/${followData.follower}`, {
			data: { following: followData.following },
		})

		revalidateTag("following")
	} catch (error: any) {
		throw new Error("Failed to unfollow the user! Please try again!")
	}
}

export const getFollowingStatus = async (
	followerId: string,
	followingId: string
) => {
	const fetchOptions = {
		next: {
			tags: ["following"],
		},
	}
	const res = await fetch(
		`${envConfig.baseApi}/following/status?followerId=${followerId}&followingId=${followingId}`,
		fetchOptions
	)

	const data = await res.json()

	return data.data
}

export const getFollowing = async (userId: string) => {
	const fetchOptions = {
		next: {
			tags: ["following"],
		},
	}
	const res = await fetch(
		`${envConfig.baseApi}/following/${userId}`,
		fetchOptions
	)

	const data = await res.json()

	return data
}

export const getFollower = async (userId: string) => {
	const fetchOptions = {
		next: {
			tags: ["following"],
		},
	}
	const res = await fetch(
		`${envConfig.baseApi}/following/follower/${userId}`,
		fetchOptions
	)

	const data = await res.json()

	return data
}
