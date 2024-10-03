import UserMenu from "@/src/components/modules/leftSidebar/UserMenu"
import { getCurrentUser } from "@/src/services/authServices"
import { TUser } from "@/src/types"
import { Avatar } from "@nextui-org/avatar"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { Link } from "@nextui-org/link"
import Image from "next/image"

const LeftSidebar = async () => {
	const user: TUser = await getCurrentUser()
	const date = new Date().getFullYear()

	return (
		<div>
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
							user?.image ? user.image : "https://i.ibb.co.com/H7zTvh7/user.png"
						}
					/>
					<h4 className="font-bold text-large">
						{user?.firstName} {user?.lastName}
					</h4>
					<small className="text-default-500">{user?.occupation}</small>
					<p className="text-tiny">{user?.about}</p>
				</CardHeader>
				<CardBody className="overflow-visible py-2">
					<div className="max-w-md mx-auto">
						<div className="flex h-5 items-center space-x-4 text-small text-center">
							<div>
								<b>50</b>
								<p>Posts</p>
							</div>
							<Divider orientation="vertical" />
							<div>
								<b>50</b>
								<p>Followers</p>
							</div>
							<Divider orientation="vertical" />
							<div>
								<b>50</b>
								<p>Following</p>
							</div>
						</div>
						<Divider className="my-4" />
					</div>
					<UserMenu />
				</CardBody>
			</Card>
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
