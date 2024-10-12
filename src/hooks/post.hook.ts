import { useMutation, useQuery } from "@tanstack/react-query"
import {
	addFollowing,
	commentOnPost,
	createPost,
	deleteComment,
	deletePost,
	downVote,
	getAllPosts,
	searchItems,
	unFollow,
	updateComment,
	updatePostPON,
	upVote,
} from "../services/postServices"
import { toast } from "sonner"
import { FieldValues } from "react-hook-form"
import { TFollowing } from "../components/modules/home/Following"

type UpdatePostParams = {
	id: string
	formData: FormData
}
type TVote = {
	user: string
	post: string
}

export const useCreatePost = () => {
	return useMutation<any, Error, FormData>({
		mutationKey: ["CREATE_POST"],
		mutationFn: async (postData) => await createPost(postData),
		onSuccess: () => {
			toast.success("Post created successfully")
		},
		onError: (error) => {
			toast.error(error.message || "Post creation failed")
		},
	})
}

export const useUpdatePost = () => {
	return useMutation<any, Error, UpdatePostParams>({
		mutationKey: ["UPDATE_POST"],
		mutationFn: async ({ id, formData }) => await updatePostPON(id, formData),
		onSuccess: () => {
			toast.success("Post updated successfully")
		},
		onError: (error) => {
			toast.error(error.message || "Post update failed")
		},
	})
}

export const useDeletePost = () => {
	return useMutation<any, Error, string>({
		mutationKey: ["USER_DELETE"],
		mutationFn: async (postId) => await deletePost(postId),
		onSuccess: () => {
			toast.success(`Post deleted successfully!`)
		},
		onError: (error) => toast.error(error.message || "Post delete failed"),
	})
}

// export const useGetPosts = (
// 	category: string | undefined,
// 	searchQuery: string | undefined
// ) => {
// 	return useQuery<any>({
// 		queryKey: ["POSTS", { category, searchQuery }],
// 		queryFn: async () => await getAllPosts(category, searchQuery),
// 	})
// }

export const useGetPosts = (
	category: string | undefined,
	searchQuery: string | undefined
) => {
	return useQuery<any>({
		queryKey: ["POSTS", { category, searchQuery }],
		queryFn: async () => await getAllPosts(category, searchQuery),
	})
}

export const useSearchItems = () => {
	return useMutation({
		mutationKey: ["SEARCH_ITEMS"],
		mutationFn: async (searchTerm: string) => await searchItems(searchTerm),
	})
}

// interface SearchParams {
// 	searchTerm?: string
// 	category?: string
// }
//
// export const useSearchItems = () => {
// 	return useMutation({
// 		mutationKey: ["SEARCH_ITEMS"],
// 		// Modify the mutation function to accept both searchTerm and category
// 		mutationFn: async ({ searchTerm, category }: SearchParams) =>
// 			await searchItems(searchTerm, category),
// 	})
// }

// export const useGetPosts = (params: any) => {
// 	return useQuery<any>({
// 		queryKey: ["POSTS", params],
// 		queryFn: async () => await getAllPosts(params),
// 	})
// }

export const useUpVote = () => {
	return useMutation<any, Error, TVote>({
		mutationKey: ["UPVOTE"],
		mutationFn: async (votesInfo) => await upVote(votesInfo),
		onSuccess: () => {
			toast.success(`Upvote successfully!`)
		},
		onError: (error) => toast.error(error.message),
	})
}
export const useDownVote = () => {
	return useMutation<any, Error, TVote>({
		mutationKey: ["DOWNVOTE"],
		mutationFn: async (votesInfo) => await downVote(votesInfo),
		onSuccess: (response) => {
			toast.success(response.message)
		},
		onError: (error) => {
			toast.error(error.message || "You already voted on this post")
		},
	})
}

export const useCommentOnPost = () => {
	return useMutation<any, Error, FieldValues>({
		mutationKey: ["COMMENT"],
		mutationFn: async (formData) => await commentOnPost(formData),
		onSuccess: () => {
			toast.success(`Comment successfully!`)
		},
		onError: (error) => toast.error(error.message || "Comment publish failed"),
	})
}

export const useUpdateComment = () => {
	return useMutation<any, Error, FieldValues>({
		mutationKey: ["COMMENT"],
		mutationFn: async (formData) => await updateComment(formData),
		onSuccess: () => {
			toast.success(`Your comment updated!`)
		},
		onError: (error) => toast.error(error.message || "Comment update failed"),
	})
}

export const useDeleteComment = () => {
	return useMutation<any, Error, string>({
		mutationKey: ["USER_DELETE"],
		mutationFn: async (commentId) => await deleteComment(commentId),
		onSuccess: () => {
			toast.success(`Comment deleted successfully!`)
		},
		onError: (error) => toast.error(error.message || "Comment deleted failed"),
	})
}

export const useFollowing = () => {
	return useMutation<any, Error, TFollowing>({
		mutationKey: ["COMMENT"],
		mutationFn: async (formData) => await addFollowing(formData),
		onSuccess: () => {
			toast.success(`Follow successfully!`)
		},
		onError: (error) => toast.error(error.message || "Follow failed"),
	})
}

export const useUnFollowing = () => {
	return useMutation<any, Error, TFollowing>({
		mutationKey: ["COMMENT"],
		mutationFn: async (followData) => await unFollow(followData),
		onSuccess: () => {
			toast.success(`Unfollow successfully!`)
		},
		onError: (error) => toast.error(error.message || "Unfollow failed"),
	})
}
