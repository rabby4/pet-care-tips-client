import Container from "@/src/components/ui/Container"
import EditForm from "./_components/EditForm"
import {
	getDownVoteCount,
	getPostComments,
	getSinglePost,
	getUpVoteCount,
} from "@/src/services/postServices"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Avatar } from "@nextui-org/avatar"
import { Tooltip } from "@nextui-org/tooltip"
import { BadgeCheck, Hash, Link } from "lucide-react"
import moment from "moment"
import { Chip } from "@nextui-org/chip"
import Image from "next/image"
import { Divider } from "@nextui-org/divider"
import PostActions from "@/src/components/modules/home/PostActions"
import { getCurrentUser } from "@/src/services/authServices"
import { title } from "@/src/components/primitives"

type TProps = {
	params: {
		postId: string
	}
}

const EditPost = async ({ params: { postId } }: TProps) => {
	const post = await getSinglePost(postId)
	const user = await getCurrentUser()
	const upVote = await getUpVoteCount(post?._id)
	const upVotes = upVote.data?.length
	const downVote = await getDownVoteCount(post?._id)
	const downVotes = downVote.data?.length
	const allComments = await getPostComments(post?._id)

	return (
		<Container>
			<div className="py-20 text-center">
				<h2 className={title()}>Edit your this post</h2>
			</div>
			<div className="grid grid-cols-2 gap-10">
				<Card
					className={`p-4 rounded-md ${!user?.premium && post.premium ? "blur-sm" : ""}`}
				>
					<CardHeader className="flex justify-between">
						<div className="flex gap-3">
							<Avatar
								className="transition-transform"
								src={
									post?.user?.image
										? post?.user?.image
										: "https://i.ibb.co.com/H7zTvh7/user.png"
								}
							/>
							<div className="flex flex-col">
								<div className="flex gap-2 items-center">
									<div className="text-base font-semibold capitalize flex item-center gap-1">
										{post?.user?.firstName} {post?.user?.lastName}
										{post.user?.premium && (
											<Tooltip content="Premium User">
												<span className="text-lg text-default-400 cursor-pointer active:opacity-50 flex items-center">
													<BadgeCheck color="#006fee" size={18} />
												</span>
											</Tooltip>
										)}
									</div>
								</div>
								<small className=" text-default-500">
									{moment(post?.createdAt).fromNow()}
								</small>
							</div>
						</div>
						<div>
							{post?.premium === true ? (
								<Chip color="success" variant="flat">
									Premium
								</Chip>
							) : (
								<Chip color="warning" variant="flat">
									Ordinary
								</Chip>
							)}
						</div>
					</CardHeader>

					<CardBody className="overflow-visible py-2 gap-5">
						<Chip
							color="success"
							radius="sm"
							size="md"
							startContent={<Hash size={14} />}
							variant="flat"
						>
							{post.category}
						</Chip>
						<div className="text-sm">
							{<div dangerouslySetInnerHTML={{ __html: post.content }} />}
						</div>
						{post.image && (
							<Image
								alt={post?.image && "post image"}
								className="rounded-xl size-full"
								height={0}
								sizes="100vw"
								src={post?.image && post?.image}
								width={0}
							/>
						)}
					</CardBody>
					<Divider />
					<CardFooter className="grid grid-cols-2 justify-between">
						<PostActions
							comments={allComments?.data}
							downVote={downVotes}
							id={post?._id}
							upVotes={upVotes}
							user={user}
							userId={user?._id}
						/>
					</CardFooter>
				</Card>
				<EditForm id={postId} />
			</div>
		</Container>
	)
}

export default EditPost
