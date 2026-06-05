"use server"
import { TFollowing } from "@/src/components/modules/home/Following"
import envConfig from "@/src/config/envConfig"
import axiosInstance from "@/src/lib/AxiosInstance"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

// pull the real message out of an axios/fetch error instead of "[object Object]"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorMessage = (error: any, fallback: string) =>
	error?.response?.data?.message || error?.message || fallback

// attach the token to plain fetch calls so the backend can identify the viewer
// (needed for premium content, own unpublished posts and admin data)
const authHeaders = (): Record<string, string> => {
	const accessToken = cookies().get("accessToken")?.value

	return accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPost = async (formData: FormData): Promise<any> => {
	try {
		const { data } = await axiosInstance.post("/posts", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})

		revalidateTag("posts")

		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "Failed to create post"))
	}
}

export const updatePostPON = async (id: string, formData: FormData) => {
	try {
		const { data } = await axiosInstance.patch(`/posts/${id}`, formData)

		revalidateTag("posts")

		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "Failed to update post"))
	}
}

export const getAllPosts = async (category?: string, searchQuery?: string) => {
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
			{
				headers: authHeaders(),
				next: {
					tags: ["posts"],
				},
			}
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return { error: error.message }
	}
}

export const searchItems = async (searchTerm?: string, category?: string) => {
	try {
		// Create query parameters dynamically
		const params = new URLSearchParams()

		if (searchTerm) {
			params.append("search", searchTerm) // Add search term if provided
		}

		if (category) {
			params.append("category", category) // Add category if provided
		}

		const res = await axiosInstance.get(`/posts?${params.toString()}`)

		return res.data
	} catch (error) {
		throw new Error(getErrorMessage(error, "Failed to search items"))
	}
}

export const getPostsForUser = async (userId: string) => {
	const res = await fetch(`${envConfig.baseApi}/posts/${userId}`, {
		headers: authHeaders(),
		next: {
			tags: ["posts"],
		},
	})
	const data = await res.json()

	return data
}

export const getSinglePost = async (postId: string) => {
	const res = await fetch(`${envConfig.baseApi}/posts/post/${postId}`, {
		headers: authHeaders(),
		cache: "no-store",
	})

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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "Failed to delete post"))
	}
}

export const upVote = async (votesInfo: { user?: string; post: string }) => {
	try {
		await axiosInstance.post(`/upvote`, votesInfo)
		revalidateTag("upvotes")
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "Failed to upvote"))
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

export const downVote = async (votesInfo: { user?: string; post: string }) => {
	try {
		await axiosInstance.post(`/downvote`, votesInfo)

		revalidateTag("downvote")
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "Failed to downvote"))
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "Failed to publish comment"))
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateComment = async (formData: any) => {
	try {
		await axiosInstance.patch(`/comments/${formData.id}`, {
			content: formData.content,
		})

		revalidateTag("comments")
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "Failed to update comment"))
	}
}

export const deleteComment = async (commentId: string) => {
	try {
		const res = await axiosInstance.delete(`/comments/${commentId}`)

		revalidateTag("comments")

		return res.data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "Failed to delete comment"))
	}
}

export const addFollowing = async (formData: TFollowing) => {
	try {
		await axiosInstance.post(`/following`, {
			following: formData.following,
		})

		revalidateTag("following")
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "Failed to follow the user!"))
	}
}

export const unFollow = async (followData: TFollowing) => {
	try {
		await axiosInstance.delete(`/following/${followData.follower}`, {
			data: { following: followData.following },
		})

		revalidateTag("following")
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(getErrorMessage(error, "Failed to unfollow the user!"))
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
