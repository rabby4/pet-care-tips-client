"use client"
import { Button } from "@nextui-org/button"
import React from "react"
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
	userId,
	comments,
	user,
}: PostActionsProps) => {
	const { handleSubmit, control, reset } = useForm({})
	const { mutate: handleAddUpVote } = useUpVote()
	const { mutate: handleAddDownVote } = useDownVote()
	const { mutate: handleAddComment, isPending } = useCommentOnPost()

	const handleUpVote = (id: string) => {
		if (!user) {
			return toast.error("Please login first!")
		}
		handleAddUpVote({ user: user._id, post: id })
	}
	const handleDownVote = (id: string) => {
		if (!user) {
			return toast.error("Please login first!")
		}
		handleAddDownVote({ user: user._id, post: id })
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
					color="primary"
					// disabled={user ? false : true}
					variant="light"
					// className="flex justify-center items-center"
					onClick={() => handleUpVote(id)}
				>
					<UpArrow />
				</Button>
				<p className="font-medium">{upVotes}</p>
				<Button
					isIconOnly
					className="ml-3"
					color="danger"
					variant="light"
					onClick={() => handleDownVote(id)}
				>
					<DownArrow />
				</Button>
				<p className="font-medium">{downVote}</p>
			</div>

			<div className="flex justify-end">
				<CommentsModal comments={comments} user={user} />
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
