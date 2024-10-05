import { useMutation } from "@tanstack/react-query"
import {
	addFollowing,
	commentOnPost,
	createPost,
	downVote,
	upVote,
} from "../services/postServices"
import { toast } from "sonner"
import { FieldValues } from "react-hook-form"
import { TFollowing } from "../components/modules/home/Following"

export const useCreatePost = () => {
	return useMutation<any, Error, FormData>({
		mutationKey: ["CREATE_POST"],
		mutationFn: async (postData) => await createPost(postData),
		onSuccess: () => {
			toast.success("Post created successfully")
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})
}

export const useUpVote = () => {
	return useMutation<any, Error, string>({
		mutationKey: ["UPVOTE"],
		mutationFn: async (postId) => await upVote(postId),
		onSuccess: () => {
			toast.success(`upvote successfully!`)
		},
		onError: (error) => toast.error(error.message),
	})
}
export const useDownVote = () => {
	return useMutation<any, Error, string>({
		mutationKey: ["DOWNVOTE"],
		mutationFn: async (postId) => await downVote(postId),
		onSuccess: () => {
			toast.success(`DownVote successfully!`)
		},
		onError: (error) => toast.error(error.message),
	})
}
export const useCommentOnPost = () => {
	return useMutation<any, Error, FieldValues>({
		mutationKey: ["COMMENT"],
		mutationFn: async (formData) => await commentOnPost(formData),
		onSuccess: () => {
			toast.success(`Comment successfully!`)
		},
		onError: (error) => toast.error(error.message),
	})
}
export const useFollowing = () => {
	return useMutation<any, Error, TFollowing>({
		mutationKey: ["COMMENT"],
		mutationFn: async (formData) => await addFollowing(formData),
		onSuccess: () => {
			toast.success(`Follow successfully!`)
		},
		onError: (error) => toast.error(error.message),
	})
}
