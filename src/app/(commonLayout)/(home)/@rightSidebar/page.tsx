/* eslint-disable @typescript-eslint/no-explicit-any */
import Following from "@/src/components/modules/home/Following"
import { getAllUsers, getCurrentUser } from "@/src/services/authServices"
import { getFollower, getFollowing } from "@/src/services/postServices"
import { TUser } from "@/src/types"
import { Avatar } from "@nextui-org/avatar"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Chip } from "@nextui-org/chip"
import { Divider } from "@nextui-org/divider"
import { ShieldAlert } from "lucide-react"

const RightSidebar = async () => {
	// the public user list works for everyone; follower data needs a login.
	// everything is fetched in parallel - no per-user status round trips.
	const [allUsers, user] = await Promise.all([
		getAllUsers(),
		getCurrentUser() as Promise<TUser | null>,
	])

	const [getFollow, data] = user?._id
		? await Promise.all([getFollower(user._id), getFollowing(user._id)])
		: [null, null]

	const followers = getFollow?.data?.map((item: any) => item.follower) || []
	const following = data?.data?.map((item: any) => item.following) || []

	// build a lookup of who I follow once, then derive every "isFollowing"
	// flag locally instead of calling the status endpoint per user (N+1)
	const followingIds = new Set(following.map((f: any) => f?._id))

	const followersWithStatus = followers.map((follower: any) => ({
		...follower,
		isFollowing: followingIds.has(follower?._id),
	}))

	const followingWithStatus = following.map((person: any) => ({
		...person,
		isFollowing: true,
	}))

	// suggestions: all users except myself
	const userFollowingStatus = (allUsers || [])
		.filter((candidate: any) => candidate?._id !== user?._id)
		.map((candidate: any) => ({
			...candidate,
			isFollowing: followingIds.has(candidate?._id),
		}))

	return (
		<>
			{user && (
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
								followingWithStatus.map((person: any) => (
									<div key={person?._id}>
										<div className="flex gap-3 items-start mb-3">
											<Avatar
												className="transition-transform"
												src={
													person?.image
														? person?.image
														: "https://i.ibb.co.com/H7zTvh7/user.png"
												}
											/>
											<div className="flex flex-col flex-1">
												<div className="flex gap-2 items-start justify-between">
													<div>
														<p className="text-sm font-semibold capitalize">
															{person?.firstName} {person?.lastName}
														</p>
														<p className="text-xs">{person?.occupation}</p>
													</div>
													<Following
														follower={user?._id}
														following={person?._id}
														isFollowingInitial={person.isFollowing}
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
										No following found
									</Chip>
								</>
							)}
						</CardBody>
					</Card>
				</>
			)}
			<Card className="p-3 rounded-md w-full mt-5">
				<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
					<h4 className="font-bold text-large">Find Friends</h4>
				</CardHeader>
				<CardBody className="flex flex-col gap-3">
					{userFollowingStatus?.length > 0 ? (
						userFollowingStatus.map((potentialFriend: any) => (
							<div key={potentialFriend?._id}>
								<div className="flex gap-3 items-start mb-3">
									<Avatar
										className="transition-transform"
										src={
											potentialFriend?.image ||
											"https://i.ibb.co.com/H7zTvh7/user.png"
										}
									/>
									<div className="flex flex-col flex-1">
										<div className="flex gap-2 items-start justify-between">
											<div>
												<p className="text-sm font-semibold capitalize">
													{potentialFriend?.firstName}{" "}
													{potentialFriend?.lastName}
												</p>
												<p className="text-xs">{potentialFriend?.occupation}</p>
											</div>
											<Following
												follower={user?._id}
												following={potentialFriend?._id}
												isFollowingInitial={potentialFriend.isFollowing}
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
			</Card>
		</>
	)
}

export default RightSidebar
