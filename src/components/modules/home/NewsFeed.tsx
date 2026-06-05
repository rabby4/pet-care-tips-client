/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPost } from "@/src/types"
import PostCard from "./PostCard"
import axiosInstance from "@/src/lib/AxiosInstance"
import { getCurrentUser } from "@/src/services/authServices"
import { getFollowing } from "@/src/services/postServices"

const NewsFeed = async ({
	searchParams,
}: {
	searchParams?: { search?: string; category?: string }
}) => {
	const [postsRes, user] = await Promise.all([
		axiosInstance.get(`/posts`, {
			params: {
				search: searchParams?.search || undefined,
				category: searchParams?.category || undefined,
			},
		}),
		getCurrentUser(),
	])

	// fetch the viewer's following list ONCE and pass a lookup to each card,
	// instead of every PostCard making its own follow-status request
	const following = user?._id ? await getFollowing(user._id) : null
	const followingIds: string[] =
		following?.data?.map((item: any) => item?.following?._id).filter(Boolean) ||
		[]

	// the API already filters for the viewer; only drop explicitly unpublished
	const publishedPosts = postsRes.data?.data?.filter(
		(post: TPost) => post.publish !== false
	)

	return (
		<>
			<div className="grid gap-5">
				{publishedPosts?.map((post: TPost) => (
					<PostCard
						key={post._id}
						currentUser={user}
						followingIds={followingIds}
						post={post}
					/>
				))}
			</div>
		</>
	)
}

export default NewsFeed
