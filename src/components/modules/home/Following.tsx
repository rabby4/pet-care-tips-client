"use client"
import { useFollowing } from "@/src/hooks/post.hook"

export type TFollowing = {
	user: string
	following: string
}

const Following = ({ user, following }: TFollowing) => {
	const { mutate: handleFollowing, isPending } = useFollowing()

	return (
		<button
			className="text-primary-500 text-sm"
			onClick={() => handleFollowing({ user, following })}
		>
			{isPending ? "Following" : "Follow"}
		</button>
	)
}

export default Following
