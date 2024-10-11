import NewsFeed from "@/src/components/modules/home/NewsFeed"
import Container from "@/src/components/ui/Container"

const PostsPage = ({ searchParams }: { searchParams: any }) => {
	return (
		<Container>
			<div className="w-2/4 mx-auto mb-10">
				<NewsFeed searchParams={searchParams} />
			</div>
		</Container>
	)
}

export default PostsPage
