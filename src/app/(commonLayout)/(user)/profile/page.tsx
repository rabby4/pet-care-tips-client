import { getCurrentUser } from "@/src/services/authServices"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import Image from "next/image"
import React from "react"

const ProfilePage = async () => {
	const user = await getCurrentUser()

	return (
		<Card className="p-10">
			<CardHeader className="justify-center">
				<Image
					src={"https://i.ibb.co.com/w4fXSWk/5578648.png"}
					height={200}
					width={200}
					alt="Profile welcome message"
				/>
			</CardHeader>
			<CardBody className="text-center">
				<h2 className="text-3xl font-semibold">
					Welcome {user?.firstName} {user?.lastName}!
				</h2>
				<p>This is where you can view and edit your profile information.</p>
			</CardBody>
		</Card>
	)
}

export default ProfilePage
