"use client"
import { Button } from "@nextui-org/button"
import React, { useState } from "react"
import { DownArrow, UpArrow } from "../../icons"
import { useCommentOnPost, useDownVote, useUpVote } from "@/src/hooks/post.hook"

import { Input } from "@nextui-org/input"
import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form"
import CommentsModal from "../../modals/CommentsModal"
import { PostActionsProps } from "@/src/types"
import { toast } from "sonner"

const PostActions = ({
	id,
	upVotes,
	downVote,
	commentCount,
	userVote,
	userId,
	user,
}: PostActionsProps) => {
	const { handleSubmit, control, reset } = useForm({})
	const { mutate: handleAddUpVote } = useUpVote()
	const { mutate: handleAddDownVote } = useDownVote()
	const { mutate: handleAddComment, isPending } = useCommentOnPost()

	// local copies so the count + highlighted icon update instantly on vote
	const [vote, setVote] = useState<"up" | "down" | null>(userVote ?? null)
	const [upCount, setUpCount] = useState<number>(upVotes ?? 0)
	const [downCount, setDownCount] = useState<number>(downVote ?? 0)

	const handleUpVote = () => {
		if (!user) {
			return toast.error("Please login first!")
		}
		if (vote) {
			return toast.error("You already voted on this post.")
		}
		// optimistic: highlight + bump immediately, roll back if it fails
		setVote("up")
		setUpCount((c) => c + 1)
		handleAddUpVote(
			{ user: user._id, post: id },
			{
				onError: () => {
					setVote(null)
					setUpCount((c) => c - 1)
				},
			}
		)
	}

	const handleDownVote = () => {
		if (!user) {
			return toast.error("Please login first!")
		}
		if (vote) {
			return toast.error("You already voted on this post.")
		}
		setVote("down")
		setDownCount((c) => c + 1)
		handleAddDownVote(
			{ user: user._id, post: id },
			{
				onError: () => {
					setVote(null)
					setDownCount((c) => c - 1)
				},
			}
		)
	}

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const formData = {
			...data,
			post: id,
			user: userId,
		}

		if (!user) {
			return toast.error("Please login first!")
		}

		handleAddComment(formData)
		reset()
	}

	return (
		<>
			<div className="flex gap-1 items-center">
				<Button
					isIconOnly
					className={vote === "up" ? "bg-primary/15" : ""}
					color="primary"
					variant={vote === "up" ? "flat" : "light"}
					onClick={handleUpVote}
				>
					<UpArrow {...(vote === "up" ? { fill: "currentColor" } : {})} />
				</Button>
				<p className={`font-medium ${vote === "up" ? "text-primary" : ""}`}>
					{upCount}
				</p>
				<Button
					isIconOnly
					className={`ml-3 ${vote === "down" ? "bg-danger/15" : ""}`}
					color="danger"
					variant={vote === "down" ? "flat" : "light"}
					onClick={handleDownVote}
				>
					<DownArrow {...(vote === "down" ? { fill: "currentColor" } : {})} />
				</Button>
				<p className={`font-medium ${vote === "down" ? "text-danger" : ""}`}>
					{downCount}
				</p>
			</div>

			<div className="flex justify-end">
				<CommentsModal commentCount={commentCount} postId={id} user={user} />
			</div>
			<form className="col-span-2 mt-2" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<Controller
						control={control}
						name="content"
						render={({ field }) => (
							<Input
								placeholder="Write your comment here..."
								variant={"underlined"}
								{...field}
							/>
						)}
						rules={{ required: true }}
					/>
				</div>
				<div className="flex justify-end mt-2">
					<Button
						color="primary"
						disabled={isPending ? true : false}
						type="submit"
					>
						Comment
					</Button>
				</div>
			</form>
		</>
	)
}

export default PostActions
