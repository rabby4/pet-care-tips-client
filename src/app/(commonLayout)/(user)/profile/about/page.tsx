import { getCurrentUser } from "@/src/services/authServices"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { CalendarDays, Locate, Mail, Phone, UserCog } from "lucide-react"
import moment from "moment"
import React from "react"

const AboutPage = async () => {
	const user = await getCurrentUser()

	return (
		<>
			<Card className="p-10">
				<CardHeader>
					<h2 className="text-3xl font-bold">About</h2>
				</CardHeader>
				<CardBody>
					<p className="text-sm mb-5">{user?.about}</p>
					<div className="grid grid-cols-2">
						<div className="flex flex-col gap-3">
							<p className="flex gap-2 items-center">
								<Mail size={18} />
								<span>Email: </span>
								{user?.email}
							</p>
							<p className="flex gap-2 items-center">
								<CalendarDays size={18} />
								<span>Born: </span>
								{moment(user?.dateOfBirth).format("DD-MM-YYYY")}
							</p>
							<p className="capitalize flex gap-2 items-center">
								<UserCog size={18} />
								<span>Occupation: </span>
								{user?.occupation}
							</p>
						</div>
						<div className="flex flex-col gap-3">
							<p className="flex gap-2 items-center">
								<Phone size={18} />
								<span>Phone: </span>
								{user?.phone}
							</p>
							<p className="flex gap-2 items-center">
								<Locate size={18} />
								<span>Address: </span>
								{user?.address}
							</p>
						</div>
					</div>
				</CardBody>
			</Card>
		</>
	)
}

export default AboutPage
