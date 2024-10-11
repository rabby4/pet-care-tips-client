"use client"
import { useFollowing, useUnFollowing } from "@/src/hooks/post.hook"
import { getFollowingStatus } from "@/src/services/postServices"
import { useEffect, useState } from "react"

export type TFollowing = {
	follower: string
	following: string
	isFollowingInitial?: boolean
	fetchFollowingStatus?: (
		followerId: string,
		followingId: string
	) => Promise<boolean>
}

const Following = ({
	follower,
	following,
	isFollowingInitial,
	fetchFollowingStatus,
}: TFollowing) => {
	const [isFollowing, setIsFollowing] = useState(isFollowingInitial)
	const { mutate: handleFollow, isPending: isFollowPending } = useFollowing()
	const { mutate: handleUnFollow, isPending: isUnFollowPending } =
		useUnFollowing()

	useEffect(() => {
		const checkFollowingStatus = async () => {
			if (fetchFollowingStatus) {
				try {
					const actualStatus = await getFollowingStatus(follower, following)

					setIsFollowing(actualStatus)
				} catch (error) {
					console.error("Error fetching follow status:", error)
				}
			}
		}

		checkFollowingStatus()
	}, [follower, following, fetchFollowingStatus])

	const handleToggleFollow = () => {
		if (isFollowing) {
			handleUnFollow(
				{ follower, following },
				{
					onSuccess: () => setIsFollowing(false),
					onError: (err) => console.error("Failed to unfollow:", err),
				}
			)
		} else {
			handleFollow(
				{ follower, following },
				{
					onSuccess: () => setIsFollowing(true),
					onError: (err) => console.error("Failed to follow:", err),
				}
			)
		}
	}

	return (
		<button
			className="text-primary-500 text-sm"
			disabled={isFollowPending || isUnFollowPending}
			onClick={handleToggleFollow}
		>
			{isFollowPending || isUnFollowPending
				? "Loading..."
				: isFollowing
					? "Unfollow"
					: "Follow"}
		</button>
		// <button
		// 	className="text-primary-500 text-sm"
		// 	onClick={() => handleFollow({ follower, following })}
		// >
		// 	{isPending ? "Following" : "Follow"}
		// </button>
	)
}

export default Following
