import Following from "@/src/components/modules/home/Following"
import PostActions from "@/src/components/modules/home/PostActions"
import Container from "@/src/components/ui/Container"
import PostComments from "@/src/components/ui/PostComments"
import { getCurrentUser } from "@/src/services/authServices"
import {
	getFollowingStatus,
	getPostComments,
	getSinglePost,
} from "@/src/services/postServices"
import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { FileLock } from "lucide-react"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"

type TProps = {
	params: {
		postId: string
	}
}

const PostDetails = async ({ params: { postId } }: TProps) => {
	const post = await getSinglePost(postId)
	const user = await getCurrentUser()

	// counts + the viewer's vote come embedded in the post; only the full
	// comment list (for the inline panel) and follow status are fetched here
	const [allComments, followingStatus] = await Promise.all([
		getPostComments(post?._id),
		user?._id && post?.user?._id
			? getFollowingStatus(user._id, post.user._id)
			: Promise.resolve(null),
	])

	return (
		<Container>
			<div className="grid grid-cols-2 gap-10 my-20">
				<Card className="py-4 rounded-md p-7">
					<CardHeader className="flex gap-3">
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
								<div className="text-base font-semibold capitalize">
									{post?.user?.firstName} {post?.user?.lastName}
								</div>
								{user?._id !== post?.user?._id && (
									<>
										•{" "}
										<Following
											follower={user?._id}
											following={post!.user!?._id}
											isFollowingInitial={!!followingStatus?.isFollowing}
										/>
									</>
								)}
							</div>
							<small className=" text-default-500">
								{moment(post?.createdAt).fromNow()}
							</small>
						</div>
					</CardHeader>

					<CardBody className="overflow-visible gap-5">
						{/* the API sends a short teaser instead of the full content
						    when a premium post is viewed by a non-premium user */}
						{post?.isRedacted && (
							<div className="flex flex-col items-center gap-3 border border-warning rounded-md p-5 text-center">
								<FileLock size={32} />
								<h2 className="text-lg font-semibold">
									This is premium content.
								</h2>
								<p className="text-sm">
									Upgrade your plan to read the full post.
								</p>
								<Button className="rounded-md" color="primary">
									<Link href={"/pricing"}>Upgrade Plans</Link>
								</Button>
							</div>
						)}
						<div className="">
							<div
								dangerouslySetInnerHTML={{
									__html: `${post?.content}`,
								}}
							/>
						</div>

						{post.image && (
							<Image
								alt={post?.image && "post image"}
								className="rounded-xl mx-auto"
								height={400}
								src={post?.image && post?.image}
								width={400}
							/>
						)}
					</CardBody>
					<Divider />
					<CardFooter className="grid grid-cols-2 justify-between">
						<PostActions
							commentCount={post?.commentCount ?? 0}
							downVote={post?.downvoteCount ?? 0}
							id={post?._id}
							upVotes={post?.upvoteCount ?? 0}
							user={user}
							userId={user?._id}
							userVote={post?.userVote}
						/>
					</CardFooter>
				</Card>
				<PostComments allComments={allComments} user={user} />
			</div>
		</Container>
	)
}

export default PostDetails
