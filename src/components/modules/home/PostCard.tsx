import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import Image from "next/image"
import { Avatar } from "@nextui-org/avatar"
import Link from "next/link"
import { TPost, TUser } from "@/src/types"
import moment from "moment"
import PostActions from "./PostActions"
import {
	getDownVoteCount,
	getFollowingStatus,
	getPostComments,
	getUpVoteCount,
} from "@/src/services/postServices"
import { getCurrentUser } from "@/src/services/authServices"
import Following from "./Following"
import { Chip } from "@nextui-org/chip"
import Modal from "../../ui/Modal"
import { Tooltip } from "@nextui-org/tooltip"
import { BadgeCheck, FileLock, Hash } from "lucide-react"
import { Button } from "@nextui-org/button"

const PostCard = async ({ post }: { post: TPost }) => {
	const user: TUser = await getCurrentUser()
	const upVote = await getUpVoteCount(post?._id)
	const upVotes = upVote.data?.length
	const downVote = await getDownVoteCount(post?._id)
	const downVotes = downVote.data?.length
	const allComments = await getPostComments(post?._id)
	const followingStatus = await getFollowingStatus(post.user?._id, user?._id)

	return (
		<div className="relative">
			{!user?.premium && post.premium ? (
				<div className="absolute inset-0 bg-default-900 rounded-md bg-opacity-50 flex items-center justify-center z-10">
					<div className="text-center text-white space-y-5 p-20">
						<div className="flex justify-center text-center">
							<FileLock className="text-center" size={50} />
						</div>
						<h2 className="text-2xl font-semibold">This is premium content.</h2>
						<p>
							Only premium member ca see this content. If you want to see it.
							Then click below button and upgrade your plans
						</p>

						<Button className="rounded-md" color="primary" size="lg">
							<Link href={"/pricing"}>Upgrade Plans</Link>
						</Button>
					</div>
				</div>
			) : null}

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
								•{" "}
								<Following
									fetchFollowingStatus={followingStatus?.isFollowing}
									follower={user?._id}
									following={post!.user!._id}
									isFollowingInitial={followingStatus?.isFollowing}
								/>
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
						{post.content?.length > 100 ? (
							<>
								<div
									dangerouslySetInnerHTML={{
										__html: `${post?.content.slice(0, 100)}...`,
									}}
								/>

								<Link className="text-[#2d5be3]" href={`/posts/${post?._id}`}>
									Read more
								</Link>
							</>
						) : (
							<>
								<div dangerouslySetInnerHTML={{ __html: post.content }} />

								<Link className="text-[#2d5be3]" href={`/posts/${post?._id}`}>
									Read more
								</Link>
							</>
						)}
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
		</div>
	)
}

export default PostCard
