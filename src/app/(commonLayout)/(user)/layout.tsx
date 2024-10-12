import Animation from "@/src/components/animations/Animation"
import Sidebar from "@/src/components/modules/profile/Sidebar"
import Container from "@/src/components/ui/Container"
import { getCurrentUser } from "@/src/services/authServices"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { CalendarDays, Locate, Mail, Phone, UserCog } from "lucide-react"
import moment from "moment"

const layout = async ({ children }: { children: React.ReactNode }) => {
	const user = await getCurrentUser()

	return (
		<Container>
			<div className="grid grid-cols-12 gap-5">
				<div className="col-span-8 flex flex-col gap-5">
					<Animation direction="left">
						<Sidebar />
					</Animation>
					<Animation direction="up">{children}</Animation>
				</div>
				<div className="col-span-4">
					<Animation direction="right">
						<div className="sticky top-20 h-screen">
							<Card className="p-5">
								<CardHeader>
									<h2 className="text-3xl font-bold">About</h2>
								</CardHeader>
								<CardBody>
									<p className="mb-5">{user?.about}</p>
									<div className="">
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
						</div>
					</Animation>
				</div>
			</div>
		</Container>
	)
}

export default layout
