import { getAllPosts } from "@/src/services/postServices"
import PostCard from "./PostCard"
import { TPost } from "@/src/types"

const NewsFeed = async () => {
	const { data: allPosts } = await getAllPosts()

	return (
		<>
			<div className="grid gap-5">
				{/* <InfiniteScroll
				dataLength={allPosts?.length} //This is important field to render the next data
				next={allPosts}
				hasMore={true}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p style={{ textAlign: "center" }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
				// below props only if you need pull down functionality
				// refreshFunction={this.refresh}
				pullDownToRefresh
				pullDownToRefreshThreshold={50}
				pullDownToRefreshContent={
					<h3 style={{ textAlign: "center" }}>
						&#8595; Pull down to refresh
					</h3>
				}
				releaseToRefreshContent={
					<h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
				}
			>
				{allPosts?.map((post: TPost) => (
					<PostCard key={post?._id} post={post} />
				))}
			</InfiniteScroll> */}
				{allPosts?.map((post: TPost) => (
					<PostCard key={post?._id} post={post} />
				))}
			</div>
		</>
	)
}

export default NewsFeed
