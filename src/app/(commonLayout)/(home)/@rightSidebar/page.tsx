// "use client"
import Following from "@/src/components/modules/home/Following"
import { getCurrentUser } from "@/src/services/authServices"
import { getFollower, getFollowing } from "@/src/services/postServices"
import { TUser } from "@/src/types"
import { Avatar } from "@nextui-org/avatar"
import { Card, CardHeader } from "@nextui-org/card"
import moment from "moment"

const RightSidebar = async () => {
	const user: TUser = await getCurrentUser()
	// const follower = await getFollower(user?._id)
	const follower = await getFollowing(user?._id)
	// console.log(follower.data)

	return (
		<div>
			<Card className="py-4 rounded-md">
				<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
					<h4 className="font-bold text-large">My Followers</h4>
				</CardHeader>
				{follower?.data?.map((follower: any) => (
					<div key={follower?._id} className="flex gap-3">
						<Avatar
							className="transition-transform"
							src={
								follower?.follower?.image
									? follower?.follower?.image
									: "https://i.ibb.co.com/H7zTvh7/user.png"
							}
						/>
						<div className="flex flex-col">
							<div className="flex gap-2 items-center">
								<div className="text-base font-semibold capitalize">
									{follower?.follower?.firstName}
									{follower?.follower?.lastName}
								</div>
								•{" "}
								<Following
									following={follower!._id}
									follower={user?._id}
									isFollowingInitial={false}
									fetchFollowingStatus={follower.isFollowing}
								/>
							</div>
						</div>
					</div>
				))}
				{/* <div className="flex gap-3">
					<Avatar
						className="transition-transform"
						src={
							follower.image
								? follower.image
								: "https://i.ibb.co.com/H7zTvh7/user.png"
						}
					/>
					<div className="flex flex-col">
						<div className="flex gap-2 items-center">
							<div className="text-base font-semibold capitalize">
								{follower?.firstName} {follower?.lastName}
							</div>
							•{" "}
							<Following
								following={follower!._id}
								follower={user?._id}
								isFollowingInitial={false}
								fetchFollowingStatus={followingStatus.data.isFollowing}
							/>
						</div>
						<small className=" text-default-500">
							{moment(post.createdAt).fromNow()}
						</small>
					</div>
				</div> */}
			</Card>
		</div>
	)
}

export default RightSidebar
