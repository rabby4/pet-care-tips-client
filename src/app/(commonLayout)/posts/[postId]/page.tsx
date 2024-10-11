import Following from "@/src/components/modules/home/Following"
import PostActions from "@/src/components/modules/home/PostActions"
import Container from "@/src/components/ui/Container"
import PostComments from "@/src/components/ui/PostComments"
import { getCurrentUser } from "@/src/services/authServices"
import {
	getDownVoteCount,
	getFollowingStatus,
	getPostComments,
	getSinglePost,
	getUpVoteCount,
} from "@/src/services/postServices"
import { Avatar } from "@nextui-org/avatar"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import moment from "moment"
import Image from "next/image"

type TProps = {
	params: {
		postId: string
	}
}

const PostDetails = async ({ params: { postId } }: TProps) => {
	const post = await getSinglePost(postId)
	const user = await getCurrentUser()
	const upVote = await getUpVoteCount(post?._id)
	const upVotes = upVote.data?.length
	const downVote = await getDownVoteCount(post?._id)
	const downVotes = downVote.data?.length
	const allComments = await getPostComments(post?._id)
	const followingStatus = await getFollowingStatus(post.user?._id, user?._id)

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
								•{" "}
								<Following
									fetchFollowingStatus={followingStatus?.isFollowing}
									follower={user?._id}
									following={post!.user!?._id}
									isFollowingInitial={followingStatus?.isFollowing}
								/>
							</div>
							<small className=" text-default-500">
								{moment(post?.createdAt).fromNow()}
							</small>
						</div>
					</CardHeader>

					<CardBody className="overflow-visible gap-5">
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
							comments={allComments?.data}
							downVote={downVotes}
							id={post?._id}
							upVotes={upVotes}
							user={user}
							userId={user?._id}
						/>
					</CardFooter>
				</Card>
				<PostComments allComments={allComments} user={user} />
			</div>
		</Container>
	)
}

export default PostDetails
