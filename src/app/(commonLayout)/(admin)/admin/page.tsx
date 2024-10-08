import Container from "@/src/components/ui/Container"
import { getCurrentUser } from "@/src/services/authServices"
import { TUser } from "@/src/types"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import Image from "next/image"

const AdminPage = async () => {
	const user: TUser = await getCurrentUser()

	return (
		<>
			<Card className="p-10">
				<CardHeader className="justify-center">
					<Image
						alt="Profile welcome message"
						height={200}
						src={"https://i.ibb.co.com/w4fXSWk/5578648.png"}
						width={200}
					/>
				</CardHeader>
				<CardBody className="text-center w-2/3 mx-auto">
					<h2 className="text-3xl font-semibold">
						Welcome {user?.firstName} {user?.lastName}!
					</h2>
					<p className="text-sm">
						Welcome to your dashboard. This is where you can see users, post and
						payment history. Also, you can edit your own profile information,
						publish / unpublish posts.
					</p>
				</CardBody>
			</Card>
		</>
	)
}

export default AdminPage
