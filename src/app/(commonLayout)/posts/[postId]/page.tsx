type TProps = {
	params: {
		postId: string
	}
}

const PostDetails = ({ params: { postId } }: TProps) => {
	return (
		<div>
			<h1>this is post details page of {postId}</h1>
		</div>
	)
}

export default PostDetails
