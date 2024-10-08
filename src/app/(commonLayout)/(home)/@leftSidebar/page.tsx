import UserMenu from "@/src/components/modules/leftSidebar/UserMenu"
import { getCurrentUser } from "@/src/services/authServices"
import {
	getFollower,
	getFollowing,
	getPostsForUser,
} from "@/src/services/postServices"
import { TUser } from "@/src/types"
import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { Link } from "@nextui-org/link"
import Image from "next/image"

const LeftSidebar = async () => {
	const user: TUser = await getCurrentUser()
	const date = new Date().getFullYear()
	const following = await getFollowing(user?._id)
	const follower = await getFollower(user?._id)
	const myPosts = await getPostsForUser(user?._id)

	return (
		<div>
			{user ? (
				<Card className="pb-4 rounded-md">
					<Image
						alt="Card background"
						className="w-full h-20 object-cover"
						height={0}
						sizes="100vw"
						src="https://social-react-sb.vercel.app/assets/01-DFkpitQe.jpg"
						width={0}
					/>
					<CardHeader className="pb-0 pt-0 px-4 flex-col items-center gap-2">
						<Avatar
							className="w-20 h-20 text-large -mt-6"
							radius="sm"
							size="lg"
							src={
								user?.image
									? user.image
									: "https://i.ibb.co.com/H7zTvh7/user.png"
							}
						/>
						<h4 className="font-bold text-large">
							{user?.firstName} {user?.lastName}
						</h4>
						<small className="text-default-500 capitalize">
							{user?.occupation}
						</small>
						<p className="text-tiny text-center my-3">
							{user?.about && user.about.slice(0, 100)}
						</p>
					</CardHeader>
					<CardBody className="overflow-visible py-2">
						<div className="max-w-md mx-auto">
							<div className="flex h-5 items-center space-x-4 text-small text-center">
								<div>
									<b>{myPosts?.data?.length}</b>
									<p>Posts</p>
								</div>
								<Divider orientation="vertical" />
								<div>
									<b>{follower?.data?.length}</b>
									<p>Followers</p>
								</div>
								<Divider orientation="vertical" />
								<div>
									<b>{following?.data?.length}</b>
									<p>Following</p>
								</div>
							</div>
							<Divider className="my-4" />
						</div>
						<UserMenu />
					</CardBody>
				</Card>
			) : (
				<Card className="rounded-md">
					<CardBody className="flex flex-col items-center py-10 gap-3">
						<h2 className="text-xl font-semibold">You are not logged in</h2>
						<p className="text-sm">Please login</p>
						<Button className="rounded-md px-10" color="primary" variant="flat">
							<Link href="/login">Login</Link>
						</Button>
					</CardBody>
				</Card>
			)}

			<div className="flex gap-4 flex-wrap p-5 justify-center">
				<Link href="#" size="sm">
					About
				</Link>
				<Link href="#" size="sm">
					Settings
				</Link>
				<Link href="#" size="sm">
					Docs
				</Link>
				<Link href="#" size="sm">
					Support
				</Link>
				<Link href="#" size="sm">
					Help
				</Link>
				<Link href="#" size="sm">
					Privacy and Policy
				</Link>
			</div>
			<p className="text-sm text-center">@{date}</p>
		</div>
	)
}

export default LeftSidebar
