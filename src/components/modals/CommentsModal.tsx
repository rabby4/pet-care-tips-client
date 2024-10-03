"use client"
import { TComment } from "@/src/types"
import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
} from "@nextui-org/modal"

const CommentsModal = ({ comments }: { comments: TComment[] }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<>
			<div className="flex flex-col gap-2">
				<Button variant="light" onPress={onOpen}>
					All comments
				</Button>
				<Modal
					className="pb-5"
					isOpen={isOpen}
					scrollBehavior="inside"
					onOpenChange={onOpenChange}
				>
					<ModalContent>
						<ModalHeader className="flex flex-col gap-1">
							All Comments
						</ModalHeader>
						<ModalBody>
							{comments.length > 0
								? comments?.map((comment) => (
										<div key={comment?._id}>
											<div className="flex gap-3">
												<Avatar
													className="transition-transform"
													src={
														comment.user.image
															? comment.user.image
															: "https://i.ibb.co.com/H7zTvh7/user.png"
													}
												/>
												<div className="flex flex-col">
													<div className="flex gap-2 items-center">
														<div className="text-sm font-semibold capitalize">
															{comment?.user?.firstName}{" "}
															{comment?.user?.lastName}
														</div>
														• <small>Follow</small>
													</div>
												</div>
											</div>
											<div className="ml-12 bg-default-100 p-5 rounded-md text-sm">
												{comment.content}
											</div>
										</div>
									))
								: "No Comments Available"}
						</ModalBody>
					</ModalContent>
				</Modal>
			</div>
		</>
	)
}

export default CommentsModal
