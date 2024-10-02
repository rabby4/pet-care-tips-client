import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import Image from "next/image"
import { Avatar } from "@nextui-org/avatar"
import Link from "next/link"
import { TPost } from "@/src/types"
import moment from "moment"
import PostActions from "./PostActions"
import { getDownVoteCount, getUpVoteCount } from "@/src/services/postServices"

const PostCard = async ({ post }: { post: TPost }) => {
	const upVote = await getUpVoteCount(post._id)
	const upVotes = upVote.data.length
	const downVote = await getDownVoteCount(post._id)
	const downVotes = downVote.data.length

	return (
		<Card className="py-4 rounded-md">
			<CardHeader className="flex gap-3">
				<Avatar
					className="transition-transform"
					src={
						post.user.image
							? post.user.image
							: "https://i.ibb.co.com/H7zTvh7/user.png"
					}
				/>
				<div className="flex flex-col">
					<div className="flex gap-2 items-center">
						<div className="text-sm font-semibold capitalize">
							{post?.user?.firstName} {post?.user?.lastName}
						</div>
						• <small>Follow</small>
					</div>
					<small className=" text-default-500">
						{moment(post.createdAt).fromNow()}{" "}
					</small>
				</div>
			</CardHeader>

			<CardBody className="overflow-visible py-2 gap-5">
				<p className="text-sm">
					{post.content.length > 100 ? (
						<>
							{post.content.slice(0, 100)}...
							<Link
								className="hover:text-[#2d5be3]"
								href={`/posts/${post._id}`}
							>
								Read more
							</Link>
						</>
					) : (
						post.content
					)}
				</p>
				{post.image && (
					<Image
						alt={post.image && "post image"}
						className="rounded-xl size-full"
						height={0}
						sizes="100vw"
						src={post?.image && post.image}
						width={0}
					/>
				)}
			</CardBody>
			<Divider />
			<CardFooter className="flex justify-between">
				<PostActions downVote={downVotes} id={post._id} upVotes={upVotes} />
			</CardFooter>
		</Card>
	)
}

export default PostCard
