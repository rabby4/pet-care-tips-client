// "use client"
import { TPost } from "@/src/types"
import PostCard from "./PostCard"
// import { useEffect, useState } from "react"
// import { useGetPosts } from "@/src/hooks/post.hook"
import { getAllPosts } from "@/src/services/postServices"

const NewsFeed = async () => {
	// const [category, setCategory] = useState<string | undefined>(undefined)
	// const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
	// const [publishedPosts, setPublishedPosts] = useState<TPost[]>([])
	const { data: allPosts } = await getAllPosts()
	// const { data: allPosts } = useGetPosts(category, searchQuery)
	// console.log(publishedPosts)

	// useEffect(() => {
	// 	if (allPosts) {
	// 		const filteredPosts = allPosts.filter(
	// 			(post: TPost) => post.publish === true
	// 		)
	// 		setPublishedPosts(filteredPosts)
	// 	}
	// }, [allPosts])

	const publishedPosts = allPosts?.filter(
		(post: TPost) => post.publish === true
	)

	return (
		<>
			{/* <div>
				<input
					type="text"
					placeholder="Search posts"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<select onChange={(e) => setCategory(e.target.value)} value={category}>
					<option value="">All Categories</option>
					<option value="tips">Tips</option>
					<option value="story">Story</option>
					
				</select>
			</div> */}
			<div className="grid gap-5">
				{publishedPosts?.map((post: TPost) => (
					<PostCard key={post._id} post={post} />
				))}
			</div>
		</>
	)
}

export default NewsFeed
