import { getCurrentUser } from "@/src/services/authServices"
import { getFollower } from "@/src/services/postServices"
import { TUser } from "@/src/types"
import { Avatar } from "@nextui-org/avatar"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import Image from "next/image"

const RightSidebar = async () => {
	const user: TUser = await getCurrentUser()
	const follower = await getFollower(user?._id)

	return (
		<div>
			<Card className="py-4 rounded-md">
				<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
					<h4 className="font-bold text-large">My Followers</h4>
				</CardHeader>
				{/* <CardBody className="overflow-visible py-2">
					{follower.length === 0 ? (
						<p>No followers yet.</p>
					) : (
						follower?.data?.map((follower) => (
							<div key={follower?._id}>
								<Avatar
									className="transition-transform"
									src={
										follower.user.image
											? post.user.image
											: "https://i.ibb.co.com/H7zTvh7/user.png"
									}
								/>
								<div className="flex flex-col">
									<div className="flex gap-2 items-center">
										<div className="text-base font-semibold capitalize">
											{post?.user?.firstName} {post?.user?.lastName}
										</div>
										• <Following user={user?._id} following={post?.user?._id} />
									</div>
									<small className=" text-default-500">
										{moment(post.createdAt).fromNow()}
									</small>
								</div>
							</div>
						))
					)}
				</CardBody> */}
			</Card>
		</div>
	)
}

export default RightSidebar
