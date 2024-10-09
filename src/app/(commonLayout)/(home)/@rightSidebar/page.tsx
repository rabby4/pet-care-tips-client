import Following from "@/src/components/modules/home/Following"
import { getCurrentUser } from "@/src/services/authServices"
import { getFollower } from "@/src/services/postServices"
import { TUser } from "@/src/types"
import { Avatar } from "@nextui-org/avatar"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"

const RightSidebar = async () => {
	const user: TUser = await getCurrentUser()
	const data = await getFollower(user?._id)
	const followers = data?.data?.map((item: any) => item.follower)

	return (
		<>
			<Card className="p-3 rounded-md w-full">
				<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
					<h4 className="font-bold text-large">My Followers</h4>
				</CardHeader>
				<CardBody className="flex flex-col gap-3">
					{followers?.map((follower: any) => (
						<>
							<div key={follower?._id} className="flex gap-3 items-start">
								<Avatar
									className="transition-transform"
									src={
										follower?.image
											? follower?.image
											: "https://i.ibb.co.com/H7zTvh7/user.png"
									}
								/>
								<div className="flex flex-col flex-1">
									<div className="flex gap-2 items-start justify-between">
										<div>
											<p className="text-sm font-semibold capitalize">
												{follower?.firstName} {follower?.lastName}
											</p>
											<p className="text-xs">{follower?.occupation}</p>
										</div>
										<Following
											fetchFollowingStatus={follower.isFollowing}
											follower={user?._id}
											following={follower!._id}
											isFollowingInitial={false}
										/>
									</div>
								</div>
							</div>
							<Divider />
						</>
					))}
				</CardBody>
			</Card>
		</>
	)
}

export default RightSidebar
