"use client"
import { Button } from "@nextui-org/button"
import React from "react"
import { Comment, DownArrow, UpArrow } from "../../icons"
import { useDownVote, useUpVote } from "@/src/hooks/post.hook"

const PostActions = ({
	id,
	upVotes,
	downVote,
}: {
	id: string
	upVotes: number
	downVote: number
}) => {
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
					className="flex justify-center items-center rounded-full"
					onClick={() => handleUpVote(id)}
				>
					<UpArrow />
					<p>{upVotes}</p>
				</Button>
				<Button
					className="flex justify-center items-center rounded-full"
					onClick={() => handleDownVote(id)}
				>
					<DownArrow />
					<p>{downVote}</p>
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
