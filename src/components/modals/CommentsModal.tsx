"use client"
import { useState } from "react"
import { useDeleteComment, useUpdateComment } from "@/src/hooks/post.hook"
import { getPostComments } from "@/src/services/postServices"
import { TComment, TUser } from "@/src/types"
import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"
import { Spinner } from "@nextui-org/spinner"
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
} from "@nextui-org/modal"
import { MessageCircle } from "lucide-react"

const CommentsModal = ({
	postId,
	commentCount,
	user,
}: {
	postId: string
	commentCount: number
	user: TUser
}) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const { mutate: handleUpdateComment } = useUpdateComment()
	const { mutate: handleDeleteComment } = useDeleteComment()

	// comments are loaded lazily only when the modal opens, so the feed
	// no longer fetches every post's comments up front
	const [comments, setComments] = useState<TComment[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const loadComments = async () => {
		setIsLoading(true)
		try {
			const res = await getPostComments(postId)

			setComments(res?.data ?? [])
		} finally {
			setIsLoading(false)
		}
	}

	const handleOpen = () => {
		loadComments()
		onOpen()
	}

	// State to track the comment being edited and its content
	const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
	const [editContent, setEditContent] = useState<string>("")

	// Start editing a comment
	const handleEdit = (comment: TComment) => {
		setEditingCommentId(comment?._id)
		setEditContent(comment?.content)
	}

	// Cancel editing
	const handleCancelEdit = () => {
		setEditingCommentId(null)
		setEditContent("")
	}

	// Save updated comment
	const handleSaveEdit = (comment: TComment) => {
		const data = { id: comment?._id, content: editContent }

		handleUpdateComment(data, {
			onSuccess: () =>
				setComments((prev) =>
					prev.map((c) =>
						c._id === comment._id ? { ...c, content: editContent } : c
					)
				),
		})
		setEditingCommentId(null)
	}

	const handleDelete = (commentId: string) => {
		handleDeleteComment(commentId, {
			onSuccess: () =>
				setComments((prev) => prev.filter((c) => c._id !== commentId)),
		})
	}

	return (
		<>
			<div className="flex flex-col gap-2">
				<Button
					startContent={<MessageCircle color="#006fee" size={18} />}
					variant="light"
					onPress={handleOpen}
				>
					{commentCount} comments
				</Button>
				<Modal
					className="pb-5"
					isOpen={isOpen}
					scrollBehavior="inside"
					size="lg"
					onOpenChange={onOpenChange}
				>
					<ModalContent>
						<ModalHeader className="flex flex-col gap-1">
							All Comments
						</ModalHeader>
						<ModalBody>
							{isLoading ? (
								<div className="flex justify-center py-10">
									<Spinner />
								</div>
							) : comments?.length > 0 ? (
								comments?.map((comment) => (
									<div key={comment?._id}>
										<div className="flex gap-3">
											<Avatar
												className="transition-transform"
												src={
													comment?.user?.image
														? comment?.user?.image
														: "https://i.ibb.co.com/H7zTvh7/user.png"
												}
											/>
											<div className="flex flex-col">
												<div className="flex gap-2 items-center">
													<div className="text-sm font-semibold capitalize">
														{comment?.user?.firstName} {comment?.user?.lastName}
													</div>
												</div>
											</div>
										</div>

										{/* Check if comment is in edit mode */}
										{editingCommentId === comment?._id ? (
											<div className="ml-12 mt-2">
												<textarea
													className="w-full p-2 border rounded-md"
													value={editContent}
													onChange={(e) => setEditContent(e.target.value)}
												/>
												{/* Save and Cancel buttons */}
												<div className="flex gap-2 justify-end mt-2">
													<button
														className="text-blue-600"
														onClick={() => handleSaveEdit(comment)}
													>
														Save
													</button>
													<button
														className="text-red-600"
														onClick={handleCancelEdit}
													>
														Cancel
													</button>
												</div>
											</div>
										) : (
											<div className="ml-12 bg-default-100 p-5 rounded-md text-sm">
												{comment?.content}
											</div>
										)}

										{/* Edit/Delete only for the comment's own author */}
										{comment?.user?._id === user?._id &&
											editingCommentId !== comment?._id && (
												<div className="text-xs flex gap-2 justify-end mt-2">
													<button onClick={() => handleEdit(comment)}>Edit</button>
													<button
														className="text-red-600"
														onClick={() => handleDelete(comment?._id)}
													>
														Delete
													</button>
												</div>
											)}
									</div>
								))
							) : (
								"No Comments Available"
							)}
						</ModalBody>
					</ModalContent>
				</Modal>
			</div>
		</>
	)
}

export default CommentsModal
