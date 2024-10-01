import { getCurrentUser } from "@/src/services/authServices"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import Image from "next/image"

const LeftSidebar = async () => {
	const user = await getCurrentUser()

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
				<CardHeader className="pb-0 pt-0 px-4 flex-col items-start">
					<Image
						alt="Card background"
						className="rounded-xl size-full"
						height={0}
						sizes="100vw"
						src={user?.image}
						width={0}
					/>
					<p className="text-tiny uppercase font-bold">{user?.firstName}</p>
					<small className="text-default-500">12 Tracks</small>
					<h4 className="font-bold text-large">Frontend Radio</h4>
				</CardHeader>
				<CardBody className="overflow-visible py-2"></CardBody>
			</Card>
		</div>
	)
}

export default LeftSidebar
