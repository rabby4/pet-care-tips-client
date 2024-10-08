import { TPost } from "@/src/types"
import PostCard from "./PostCard"
import { getAllPosts } from "@/src/services/postServices"

const NewsFeed = async () => {
	const { data: allPosts } = await getAllPosts()

	return (
		<>
			<div className="grid gap-5">
				{allPosts?.map((post: TPost) => (
					<PostCard key={post?._id} post={post} />
				))}
			</div>
		</>
	)
}

export default NewsFeed
