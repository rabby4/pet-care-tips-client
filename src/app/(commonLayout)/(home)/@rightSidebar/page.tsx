import Following from "@/src/components/modules/home/Following"
import { getAllUsers, getCurrentUser } from "@/src/services/authServices"
import {
	getFollower,
	getFollowing,
	getFollowingStatus,
} from "@/src/services/postServices"
import { TUser } from "@/src/types"
import { Avatar } from "@nextui-org/avatar"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Chip } from "@nextui-org/chip"
import { Divider } from "@nextui-org/divider"
import { ShieldAlert } from "lucide-react"

const RightSidebar = async () => {
	const allUsers = await getAllUsers()
	const user: TUser = await getCurrentUser()
	const getFollow = await getFollower(user?._id)
	const data = await getFollowing(user?._id)
	const followers = getFollow?.data?.map((item: any) => item.follower)
	const following = data?.data?.map((item: any) => item.following)

	// Fetch following status for each follower
	const followersWithStatus = await Promise.all(
		followers?.map(async (follower: any) => {
			const status = await getFollowingStatus(user?._id, follower?._id)

			return {
				...follower,
				isFollowing: status?.isFollowing,
			}
		}) || []
	)

	// Fetch following status for each follower
	const followingWithStatus = await Promise.all(
		following?.map(async (follower: any) => {
			const status = await getFollowingStatus(follower?._id, user?._id)

			return {
				...follower,
				isFollowing: status?.isFollowing,
			}
		}) || []
	)

	const userFollowingStatus = await Promise.all(
		allUsers?.map(async (follower: any) => {
			const status = await getFollowingStatus(follower?._id, user?._id)

			return {
				...follower,
				isFollowing: status?.isFollowing, // True or False
			}
		}) || []
	)

	return (
		<>
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
												fetchFollowingStatus={follower.isFollowing}
												follower={user?._id}
												following={follower?._id}
												isFollowingInitial={follower.isFollowing}
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
			<Card className="p-3 rounded-md w-full mt-5">
				<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
					<h4 className="font-bold text-large">My Following</h4>
				</CardHeader>
				<CardBody className="flex flex-col gap-3">
					{followingWithStatus && followingWithStatus.length > 0 ? (
						followingWithStatus.map((follower: any) => (
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
												fetchFollowingStatus={follower.isFollowing}
												follower={follower?._id}
												following={user?._id}
												isFollowingInitial={following.isFollowing}
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
			{/* <Card className="p-3 rounded-md w-full mt-5">
				<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
					<h4 className="font-bold text-large">Find Friends</h4>
				</CardHeader>
				<CardBody className="flex flex-col gap-3">
					{userFollowingStatus?.length > 0 ? (
						userFollowingStatus.map((user: any) => (
							<div key={user?._id}>
								<div className="flex gap-3 items-start mb-3">
									<Avatar
										className="transition-transform"
										src={user?.image || "https://i.ibb.co.com/H7zTvh7/user.png"}
									/>
									<div className="flex flex-col flex-1">
										<div className="flex gap-2 items-start justify-between">
											<div>
												<p className="text-sm font-semibold capitalize">
													{user?.firstName} {user?.lastName}
												</p>
												<p className="text-xs">{user?.occupation}</p>
											</div>
											<Following
												fetchFollowingStatus={user.isFollowing}
												follower={user?._id}
												following={user?._id}
												isFollowingInitial={user.isFollowing}
											/>
										</div>
									</div>
								</div>
								<Divider />
							</div>
						))
					) : (
						<Chip
							color="warning"
							startContent={<ShieldAlert size={18} />}
							variant="flat"
						>
							No users found
						</Chip>
					)}
				</CardBody>
			</Card> */}
		</>
	)
}

export default RightSidebar
