import Following from "@/src/components/modules/home/Following"
import { getCurrentUser } from "@/src/services/authServices"
import { getFollower, getFollowing } from "@/src/services/postServices"
import { TUser } from "@/src/types"
import { Avatar } from "@nextui-org/avatar"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Chip } from "@nextui-org/chip"
import { Divider } from "@nextui-org/divider"
import { ShieldAlert } from "lucide-react"

const Followers = async () => {
	const user: TUser = await getCurrentUser()

	// fetch my followers and my following in parallel, then derive
	// "do I follow them back?" locally instead of one request per follower
	const [followerRes, followingRes] = user?._id
		? await Promise.all([getFollower(user._id), getFollowing(user._id)])
		: [null, null]

	const followers = followerRes?.data?.map((item: any) => item.follower)
	const followingIds = new Set(
		followingRes?.data?.map((item: any) => item?.following?._id)
	)

	const followersWithStatus =
		followers?.map((follower: any) => ({
			...follower,
			isFollowing: followingIds.has(follower?._id),
		})) || []

	return (
		<Card className="p-3 rounded-md w-full">
			<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
				<h4 className="font-bold text-large">My Followers</h4>
			</CardHeader>
			<CardBody className="flex flex-col gap-3">
				{followersWithStatus && followersWithStatus.length > 0 ? (
					followersWithStatus.map((follower: any) => (
						<div key={follower?._id}>
							<div className="flex gap-3 items-start mb-3">
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
											follower={user?._id}
											following={follower?._id}
											isFollowingInitial={!!follower.isFollowing}
										/>
									</div>
								</div>
							</div>
							<Divider />
						</div>
					))
				) : (
					<>
						<Chip
							color="warning"
							startContent={<ShieldAlert size={18} />}
							variant="flat"
						>
							No followers found
						</Chip>
					</>
				)}
			</CardBody>
		</Card>
	)
}

export default Followers
