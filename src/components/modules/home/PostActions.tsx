"use client"
import { Button } from "@nextui-org/button"
import React from "react"
import { Comment, DownArrow, UpArrow } from "../../icons"
import { useCommentOnPost, useDownVote, useUpVote } from "@/src/hooks/post.hook"
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@nextui-org/modal"
import { Textarea } from "@nextui-org/input"
import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form"
import CommentsModal from "../../modals/CommentsModal"
import { PostActionsProps } from "@/src/types"

const PostActions = ({
	id,
	upVotes,
	downVote,
	userId,
	comments,
}: PostActionsProps) => {
	const { handleSubmit, control } = useForm({})
	const { mutate: handleAddUpVote } = useUpVote()
	const { mutate: handleAddDownVote } = useDownVote()
	const { mutate: handleAddComment } = useCommentOnPost()
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const handleUpVote = (id: string) => {
		handleAddUpVote(id)
	}
	const handleDownVote = (id: string) => {
		handleAddDownVote(id)
	}

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const formData = {
			...data,
			post: id,
			user: userId,
		}

		handleAddComment(formData)
	}

	return (
		<>
			<div className="flex gap-5">
				<Button
					className="flex justify-center items-center rounded-full"
					onClick={() => handleUpVote(id)}
				>
					<UpArrow />
					<p>{upVotes}</p>
				</Button>
				<Button
					className="flex justify-center items-center rounded-full"
					onClick={() => handleDownVote(id)}
				>
					<DownArrow />
					<p>{downVote}</p>
				</Button>
			</div>
			<CommentsModal comments={comments} />
			<div>
				<Button onPress={onOpen}>
					<Comment />
					<p>12k</p>
				</Button>
				<Modal
					isOpen={isOpen}
					placement="top-center"
					onOpenChange={onOpenChange}
				>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1">
									Write your comment here
								</ModalHeader>
								<form onSubmit={handleSubmit(onSubmit)}>
									<ModalBody>
										<Controller
											control={control}
											name="content"
											render={({ field }) => (
												<Textarea
													placeholder="What's on your mind?"
													variant={"underlined"}
													{...field}
												/>
											)}
											rules={{ required: true }}
										/>
									</ModalBody>
									<ModalFooter>
										<Button type="submit" color="primary" onPress={onClose}>
											Comment
										</Button>
									</ModalFooter>
								</form>
							</>
						)}
					</ModalContent>
				</Modal>
			</div>
		</>
	)
}

export default PostActions
