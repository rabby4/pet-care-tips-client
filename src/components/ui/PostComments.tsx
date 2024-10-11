"use client"
import { TComment, TUser } from "@/src/types"
import { Avatar } from "@nextui-org/avatar"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { useState } from "react"
import { useDeleteComment, useUpdateComment } from "@/src/hooks/post.hook"

const PostComments = ({
	allComments,
	user,
}: {
	allComments: { data: TComment[] }
	user: TUser
}) => {
	const { mutate: handleUpdateComment } = useUpdateComment()
	const { mutate: handleDeleteComment } = useDeleteComment()

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

		handleUpdateComment(data)
		setEditingCommentId(null)
	}

	return (
		<>
			<Card className="p-10">
				<CardHeader>
					<h2 className="text-xl font-semibold">All comments</h2>
				</CardHeader>
				<CardBody>
					{allComments?.data?.length > 0
						? allComments?.data?.map((comment) => (
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
												• <small>Follow</small>
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

									{/* Conditional rendering of Edit/Delete or Save/Cancel buttons */}
									<div className="text-xs flex gap-2 justify-end mt-2">
										{editingCommentId === comment?._id ? (
											// Save and Cancel buttons (shown during editing)
											<>{/* These are already rendered above */}</>
										) : (
											// Edit and Delete buttons (default view)
											<>
												<button
													disabled={comment?.user?._id !== user?._id}
													onClick={() => handleEdit(comment)}
												>
													Edit
												</button>
												<button
													className="text-red-600"
													disabled={comment?.user?._id !== user?._id}
													onClick={() => handleDeleteComment(comment?._id)}
												>
													Delete
												</button>
											</>
										)}
									</div>
								</div>
							))
						: "No Comments Available"}
				</CardBody>
			</Card>
		</>
	)
}

export default PostComments
