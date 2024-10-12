"use client"
import { Avatar } from "@nextui-org/avatar"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import Image from "next/image"
import AdminMenu from "./AdminMenu"
import { useUser } from "@/src/context/user.provider"

const LeftSidebar = () => {
	const { user } = useUser()

	return (
		<>
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
					<small className="text-default-500 capitalize">
						{user?.occupation}
					</small>
					<p className="text-tiny text-center my-3">
						{user?.about && user.about.slice(0, 100)}
					</p>
				</CardHeader>
				<CardBody className="overflow-visible py-2">
					<div className="max-w-md mx-auto">
						{/* <div className="flex h-5 items-center space-x-4 text-small text-center">
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
      <Divider className="my-4" /> */}
					</div>
					<AdminMenu />
				</CardBody>
			</Card>
		</>
	)
}

export default LeftSidebar
