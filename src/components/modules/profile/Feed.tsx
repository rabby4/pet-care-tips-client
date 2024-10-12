"use client"
import { useDeletePost } from "@/src/hooks/post.hook"
import { getPostsForUser } from "@/src/services/postServices"
import { TPost } from "@/src/types"
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
import { Eye, PencilLine } from "lucide-react"
import React, { useEffect, useState } from "react"
import { DeleteIcon } from "../../icons"
import Link from "next/link"
import { Avatar } from "@nextui-org/avatar"

const Feed = ({ user }: { user: any }) => {
	const [posts, setPosts] = useState<TPost[]>([])
	const { mutate: handleDeletePost } = useDeletePost()

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
									__html: `${post?.content.slice(0, 150)}...`,
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
							className="w-20 h-20 text-large"
							radius="sm"
							src={post.image}
						/>
					</div>
				)

			case "category":
				return (
					<Chip color={"success"} size="sm" variant="flat">
						# {post.category}
					</Chip>
				)
			case "premium":
				return (
					<Chip
						color={post.premium === true ? "success" : "warning"}
						size="sm"
						variant="flat"
					>
						{post.premium ? "Premium" : "Ordinary"}
					</Chip>
				)

			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						<div className="relative flex items-center gap-2">
							<Tooltip content="Details">
								<Link
									className="text-lg text-default-400 cursor-pointer active:opacity-50"
									href={`/posts/${post._id}`}
								>
									<Eye />
								</Link>
							</Tooltip>
							<Tooltip content="Edit user">
								<Link
									className="text-lg text-default-400 cursor-pointer active:opacity-50"
									href={`/posts/${post._id}/edit`}
								>
									<PencilLine />
									{/* <UpdatePost /> */}
								</Link>
							</Tooltip>
							<Tooltip color="danger" content="Delete user">
								<button
									className="text-lg text-danger cursor-pointer active:opacity-50"
									onClick={() => handleDeletePost(post._id)}
								>
									<DeleteIcon />
								</button>
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
		{ uid: "category", name: "Category" },
		{ uid: "premium", name: "Premium" },
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
