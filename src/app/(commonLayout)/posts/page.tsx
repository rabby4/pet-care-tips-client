import NewsFeed from "@/src/components/modules/home/NewsFeed"
import Container from "@/src/components/ui/Container"

const PostsPage = () => {
	return (
		<Container>
			<div className="w-2/3 mx-auto">
				<NewsFeed />
			</div>
		</Container>
	)
}

export default PostsPage
