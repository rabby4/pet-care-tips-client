import { getPostsForUser } from "@/src/services/postServices"
import { TPost } from "@/src/types"
import PostCard from "../home/PostCard"
import { getCurrentUser } from "@/src/services/authServices"

const Feed = async () => {
	const user = await getCurrentUser()
	const { data: allPosts } = await getPostsForUser(user._id)

	return (
		<div className="grid gap-5">
			{allPosts.map((post: TPost) => (
				<PostCard key={post?._id} post={post} />
			))}
		</div>
	)
}

export default Feed
