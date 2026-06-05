"use client"
import { useFollowing, useUnFollowing } from "@/src/hooks/post.hook"
import { useState } from "react"
import { toast } from "sonner"

export type TFollowing = {
	// undefined when the viewer is not logged in
	follower?: string
	following: string
	isFollowingInitial?: boolean
}

const Following = ({ follower, following, isFollowingInitial }: TFollowing) => {
	// trust the status resolved on the server; update optimistically on toggle.
	// (previously this re-fetched status on mount for every card -> a burst of
	// network requests on every page load.)
	const [isFollowing, setIsFollowing] = useState<boolean>(!!isFollowingInitial)
	const { mutate: handleFollow, isPending: isFollowPending } = useFollowing()
	const { mutate: handleUnFollow, isPending: isUnFollowPending } =
		useUnFollowing()

	const handleToggleFollow = () => {
		if (!follower) {
			return toast.error("Please login first!")
		}

		if (isFollowing) {
			handleUnFollow(
				{ follower, following },
				{
					onSuccess: () => setIsFollowing(false),
				}
			)
		} else {
			handleFollow(
				{ follower, following },
				{
					onSuccess: () => setIsFollowing(true),
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
	)
}

export default Following
