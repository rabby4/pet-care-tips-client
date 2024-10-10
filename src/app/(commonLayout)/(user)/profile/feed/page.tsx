import Feed from "@/src/components/modules/profile/Feed"
import { getCurrentUser } from "@/src/services/authServices"

const FeedPage = async () => {
	const user = await getCurrentUser()

	return (
		<>
			<Feed user={user} />
		</>
	)
}

export default FeedPage
