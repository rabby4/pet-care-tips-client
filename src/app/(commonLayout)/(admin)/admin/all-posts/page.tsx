"use client"
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@nextui-org/table"
import React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Tooltip } from "@nextui-org/tooltip"
import { Chip } from "@nextui-org/chip"
import { useEffect, useState } from "react"
import { getAllPosts } from "@/src/services/postServices"
import { TPost } from "@/src/types"
import { User } from "@nextui-org/user"
import { useUpdatePost } from "@/src/hooks/post.hook"

const AllPosts = () => {
	const [posts, setPosts] = useState<TPost[]>([])
	const { mutate: handleUpdatePost } = useUpdatePost()

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await getAllPosts()

			setPosts(response.data)
		}

		fetchPosts()
	}, [])

	const handlePublishToggle = (id: string, currentPublishState: boolean) => {
		const postData = {
			publish: !currentPublishState,
		}

		const data: any = { id, postData }

		setPosts((prevPosts) =>
			prevPosts.map((post) =>
				post._id === id ? { ...post, publish: !post.publish } : post
			)
		)

		handleUpdatePost(data)
	}

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

			case "user":
				return (
					<div>
						<User
							name={`${post?.user?.firstName} ${post?.user?.lastName}`}
							description={post?.user?.email}
							avatarProps={{
								src: `${post?.user?.image}`,
							}}
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
						<Tooltip content={post.publish ? "Unpublish Post" : "Publish Post"}>
							<button
								onClick={() => handlePublishToggle(post._id, post.publish)}
								className={`text-lg ${
									post.publish ? "text-warning" : "text-success"
								} cursor-pointer active:opacity-50`}
							>
								{post.publish ? <Eye /> : <EyeOff />}
							</button>
						</Tooltip>
					</div>
				)

			default:
				if (typeof cellValue === "object" && cellValue !== null) {
					return JSON.stringify(cellValue)
				}

				return cellValue
		}
	}, [])

	// if (!posts.length) return <p>Loading...</p>

	const columns = [
		{ uid: "user", name: "Posted By" },
		{ uid: "content", name: "Content" },
		{ uid: "upvoteCount", name: "Upvotes" },
		{ uid: "actions", name: "Actions" },
	]

	return (
		<>
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
		</>
	)
}

export default AllPosts
