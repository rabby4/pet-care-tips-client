"use client"
import { Button } from "@nextui-org/button"
import React from "react"
import { Comment, DownArrow, UpArrow } from "../../icons"
import { useDownVote, useUpVote } from "@/src/hooks/post.hook"

const PostActions = async ({ id }: { id: string }) => {
	const { mutate: handleAddUpVote } = useUpVote()
	const { mutate: handleAddDownVote } = useDownVote()

	const handleUpVote = (id: string) => {
		handleAddUpVote(id)
	}
	const handleDownVote = (id: string) => {
		handleAddDownVote(id)
	}

	return (
		<>
			<div className="flex gap-5">
				<Button
					onClick={() => handleUpVote(id)}
					className="flex justify-center items-center rounded-full"
				>
					<UpArrow />
					<p>12k</p>
				</Button>
				<Button
					onClick={() => handleDownVote(id)}
					className="flex justify-center items-center rounded-full"
				>
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
		</>
	)
}

export default PostActions
