import { getAllPosts } from "@/src/services/postServices"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import Image from "next/image"

const NewsFeed = async () => {
	const { data: allPosts } = await getAllPosts()
	console.log(allPosts)

	return (
		<div>
			<Card className="py-4">
				<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
					<p className="text-tiny uppercase font-bold">Daily Mix</p>
					<small className="text-default-500">12 Tracks</small>
					<h4 className="font-bold text-large">Frontend Radio</h4>
				</CardHeader>
				<CardBody className="overflow-visible py-2">
					<Image
						alt="Card background"
						className="object-cover rounded-xl"
						height={270}
						src="https://nextui.org/images/hero-card-complete.jpeg"
						width={270}
					/>
				</CardBody>
			</Card>
		</div>
	)
}

export default NewsFeed
