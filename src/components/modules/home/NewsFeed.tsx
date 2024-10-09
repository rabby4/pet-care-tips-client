import { TPost } from "@/src/types"
import PostCard from "./PostCard"
import { getAllPosts } from "@/src/services/postServices"
import axiosInstance from "@/src/lib/AxiosInstance"

const NewsFeed = async ({ searchParams }: { searchParams: any }) => {
	// const { data: allPosts } = await getAllPosts()

	const params = new URLSearchParams(searchParams)

	const { data } = await axiosInstance.get(`/posts`, {
		params: { search: params.get("search") },
	})

	const publishedPosts = data?.data?.filter(
		(post: TPost) => post.publish === true
	)

	return (
		<>
			<div className="grid gap-5">
				{publishedPosts?.map((post: TPost) => (
					<PostCard key={post._id} post={post} />
				))}
			</div>
		</>
	)
}

export default NewsFeed
