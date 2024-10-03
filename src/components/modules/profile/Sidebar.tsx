import { getCurrentUser } from "@/src/services/authServices"
import { getFollower } from "@/src/services/postServices"
import { TUser } from "@/src/types"
import { Avatar } from "@nextui-org/avatar"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Link } from "@nextui-org/link"
import Image from "next/image"
import ProfileNavbar from "./ProfileNavbar"

const Sidebar = async () => {
	const user: TUser = await getCurrentUser()
	const follower = await getFollower(user?._id)

	return (
		<div className="flex flex-col gap-10">
			<Card className="pb-4 rounded-md">
				<Image
					alt="Card background"
					className="w-full h-44 object-cover"
					height={0}
					sizes="100vw"
					src="https://social-react-sb.vercel.app/assets/01-DFkpitQe.jpg"
					width={0}
				/>
				<CardHeader className="pb-0 pt-0 px-4 items-start gap-2">
					<Avatar
						className="w-32 h-32 text-large -mt-12 rounded-full"
						radius="sm"
						size="lg"
						src={
							user?.image ? user.image : "https://i.ibb.co.com/H7zTvh7/user.png"
						}
					/>

					<div className="self-end flex justify-between flex-1">
						<div>
							<h4 className="font-bold text-large">
								{user?.firstName} {user?.lastName}
							</h4>

							<p>{follower?.data?.length} Followers</p>
						</div>
						<Link
							className="rounded-md font-semibold"
							color="danger"
							// startContent={<PenBoxIcon size={15} />}
							href="/profile/edit-profile"
						>
							Edit Profile
						</Link>
					</div>
				</CardHeader>
				<CardBody className="overflow-visible py-2">
					<ProfileNavbar />
				</CardBody>
			</Card>
			{/* <Card>
				<CardBody>
					<ProfileTabs />
				</CardBody>
			</Card> */}
		</div>
	)
}

export default Sidebar
