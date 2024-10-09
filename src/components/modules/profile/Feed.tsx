import { getPostsForUser } from "@/src/services/postServices"
import { TPost } from "@/src/types"
import PostCard from "../home/PostCard"
import { getCurrentUser } from "@/src/services/authServices"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import Image from "next/image"

const Feed = async () => {
	const user = await getCurrentUser()
	const { data: allPosts } = await getPostsForUser(user?._id)

	return (
		<div className="grid gap-5">
			{allPosts?.length > 0 ? (
				allPosts.map((post: TPost) => <PostCard key={post?._id} post={post} />)
			) : (
				<Card className="py-10 rounded-md">
					<CardHeader className="flex justify-center">
						<Image
							alt="No data found"
							height={200}
							src={"https://himalayanstallion.in/assets/images/noData.gif"}
							width={200}
						/>
					</CardHeader>
					<CardBody className="text-center">
						<h2 className="text-3xl font-semibold">
							you haven&apos;t published any posts yet.
						</h2>
					</CardBody>
				</Card>
			)}
		</div>
	)
}

export default Feed
