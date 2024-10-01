import { Button } from "@nextui-org/button"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import Image from "next/image"
import { Comment, DownArrow, UpArrow } from "../../icons"
import { Avatar } from "@nextui-org/avatar"
import Link from "next/link"
import { TPost } from "@/src/types"
import moment from "moment"

const PostCard = ({ post }: { post: TPost }) => {
	return (
		<Card className="py-4 rounded-md">
			<CardHeader className="flex gap-3">
				<Avatar
					className="transition-transform"
					src={
						post.user.image
							? post.user.image
							: "https://i.ibb.co.com/H7zTvh7/user.png"
					}
				/>
				<div className="flex flex-col">
					<div className="flex gap-2 items-center">
						<div className="text-sm font-semibold capitalize">
							{post?.user?.firstName} {post?.user?.lastName}
						</div>
						• <small>Follow</small>
					</div>
					<small className=" text-default-500">
						{moment(post.createdAt).fromNow()}{" "}
					</small>
				</div>
			</CardHeader>

			<CardBody className="overflow-visible py-2 gap-5">
				<p className="text-sm">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
					perspiciatis dolores quia et aliquam voluptates nemo doloribus
					deserunt officiis voluptatum vero, eveniet, ipsum corrupti laudantium
					officia explicabo saepe sit sed.
					<Link href={`/posts/${post._id}`} className="hover:text-[#2d5be3]">
						Read more..
					</Link>
				</p>
				{post.image && (
					<Image
						alt={post.image && "post image"}
						className="rounded-xl size-full"
						height={0}
						sizes="100vw"
						src={post?.image && post.image}
						width={0}
					/>
				)}
			</CardBody>
			<Divider />
			<CardFooter className="flex justify-between">
				<div className="flex gap-5">
					<Button className="flex justify-center items-center rounded-full">
						<UpArrow />
						<p>12k</p>
					</Button>
					<Button className="flex justify-center items-center rounded-full">
						<DownArrow />
						<p>12k</p>
					</Button>
				</div>
				<div>
					<Button className="flex justify-center items-center rounded-full">
						<Comment />
						<p>12k</p>
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}

export default PostCard
