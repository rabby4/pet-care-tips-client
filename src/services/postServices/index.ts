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

export const getAllPosts = async () => {
	const fetchOptions = {
		next: {
			tags: ["posts"],
		},
	}

	try {
		// 		const params = new URLSearchParams()
		//
		// 		if (args) {
		// 			args.forEach((item: any) => {
		// 				params.append(item.name, item.value as string)
		// 			})
		// 		}

		const res = await fetch(`${envConfig.baseApi}/posts`, fetchOptions)

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

	return data
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
