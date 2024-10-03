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
			<div className="flex gap-1 items-center">
				<Button
					isIconOnly
					color="primary"
					variant="light"
					// className="flex justify-center items-center"
					onClick={() => handleUpVote(id)}
				>
					<UpArrow />
				</Button>
				<p className="text-sm">{upVotes} Up Votes</p>
				<Button
					isIconOnly
					color="primary"
					variant="light"
					className="ml-3"
					onClick={() => handleDownVote(id)}
				>
					<DownArrow />
				</Button>
				<p className="text-sm">{downVote} Down Votes</p>
			</div>

			<div className="flex gap-1">
				<Button isIconOnly color="primary" variant="light" onPress={onOpen}>
					<Comment />
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
										<Button color="primary" type="submit" onPress={onClose}>
											Comment
										</Button>
									</ModalFooter>
								</form>
							</>
						)}
					</ModalContent>
				</Modal>
				<CommentsModal comments={comments} />
			</div>
		</>
	)
}

export default PostActions
