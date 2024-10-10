"use client"
import { useUser } from "@/src/context/user.provider"
import { useUpdatePost } from "@/src/hooks/post.hook"
import { getAllPosts, getPostsForUser } from "@/src/services/postServices"
import { TPost, TUser } from "@/src/types"
import { Button } from "@nextui-org/button"
import { Chip } from "@nextui-org/chip"
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/table"
import { Tooltip } from "@nextui-org/tooltip"
import { User } from "@nextui-org/user"
import { Eye, EyeIcon, EyeOff, PencilLine } from "lucide-react"
import React, { useEffect, useState } from "react"
import { DeleteIcon } from "../../icons"
import Link from "next/link"
import { Avatar } from "@nextui-org/avatar"

const Feed = ({ user }: { user: TUser }) => {
	const [posts, setPosts] = useState<TPost[]>([])
	const { mutate: handleUpdatePost } = useUpdatePost()

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await getPostsForUser(user?._id)

			setPosts(response.data)
		}

		fetchPosts()
	}, [])

	const renderCell = React.useCallback((post: TPost, columnKey: React.Key) => {
		const cellValue = post[columnKey as keyof TPost]

		switch (columnKey) {
			case "content":
				return (
					<div>
						{post?.content?.length > 50 ? (
							<div
								dangerouslySetInnerHTML={{
									__html: `${post?.content.slice(0, 50)}...`,
								}}
							/>
						) : (
							<>
								<div dangerouslySetInnerHTML={{ __html: post.content }} />
							</>
						)}
					</div>
				)

			case "image":
				return (
					<div>
						<Avatar
							src={post.image}
							className="w-20 h-20 text-large"
							radius="sm"
						/>
					</div>
				)

			case "upvoteCount":
				return (
					<Chip
						color={post.upvoteCount > 0 ? "success" : "warning"}
						size="sm"
						variant="flat"
					>
						{post.upvoteCount} Upvotes
					</Chip>
				)

			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						{/* <Tooltip content={post.publish ? "Unpublish Post" : "Publish Post"}>
							<button
								// onClick={() => handlePublishToggle(post._id, post.publish)}
								className={`text-lg ${
									post.publish ? "text-warning" : "text-success"
								} cursor-pointer active:opacity-50`}
							>
								{post.publish ? <Eye /> : <EyeOff />}
							</button>
						</Tooltip> */}
						<div className="relative flex items-center gap-2">
							<Tooltip content="Details">
								<Link
									href={`/posts/${post._id}`}
									className="text-lg text-default-400 cursor-pointer active:opacity-50"
								>
									<Eye />
								</Link>
							</Tooltip>
							<Tooltip content="Edit user">
								<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
									<PencilLine />
								</span>
							</Tooltip>
							<Tooltip color="danger" content="Delete user">
								<span className="text-lg text-danger cursor-pointer active:opacity-50">
									<DeleteIcon />
								</span>
							</Tooltip>
						</div>
					</div>
				)

			default:
				if (typeof cellValue === "object" && cellValue !== null) {
					return JSON.stringify(cellValue)
				}

				return cellValue
		}
	}, [])

	const columns = [
		{ uid: "image", name: "Image" },
		{ uid: "content", name: "Content" },
		{ uid: "upvoteCount", name: "Upvotes" },
		{ uid: "actions", name: "Actions" },
	]

	return (
		<Table aria-label="Posts table">
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "center" : "start"}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={posts}>
				{(item) => (
					<TableRow key={item._id}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
		// <div className="grid gap-5">
		// 	{allPosts?.length > 0 ? (
		// 		allPosts.map((post: TPost) => <PostCard key={post?._id} post={post} />)
		// 	) : (
		// 		<Card className="py-10 rounded-md">
		// 			<CardHeader className="flex justify-center">
		// 				<Image
		// 					alt="No data found"
		// 					height={200}
		// 					src={"https://himalayanstallion.in/assets/images/noData.gif"}
		// 					width={200}
		// 				/>
		// 			</CardHeader>
		// 			<CardBody className="text-center">
		// 				<h2 className="text-3xl font-semibold">
		// 					you haven&apos;t published any posts yet.
		// 				</h2>
		// 			</CardBody>
		// 		</Card>
		// 	)}
		// </div>
	)
}

export default Feed
