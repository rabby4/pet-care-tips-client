import NewsFeed from "@/src/components/modules/home/NewsFeed"
import PostCard from "@/src/components/modules/home/PostCard"
import RichForm from "@/src/components/modules/home/RichForm"
import Loading from "@/src/components/ui/Loading"
import axiosInstance from "@/src/lib/AxiosInstance"
import { getCurrentUser } from "@/src/services/authServices"
import { TPost } from "@/src/types"
import { Suspense } from "react"

const AddPost = async () => {
	const user = await getCurrentUser()
	// const params = new URLSearchParams(searchParams)

	const { data } = await axiosInstance.get(`/posts`)

	const publishedPosts = data?.data?.filter(
		(post: TPost) => post.publish === true && post.user._id === user._id
	)

	return (
		<>
			<RichForm />
			<Suspense fallback={<Loading />}>
				<div className="grid gap-5">
					{publishedPosts?.map((post: TPost) => (
						<PostCard key={post._id} post={post} />
					))}
				</div>
			</Suspense>
		</>
	)
}

export default AddPost
