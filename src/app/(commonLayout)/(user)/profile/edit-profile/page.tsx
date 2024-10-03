import EditProfile from "@/src/components/modules/profile/EditProfile"
import { Card, CardBody } from "@nextui-org/card"

const EditProfilePage = () => {
	return (
		<>
			<Card>
				<CardBody className="p-20">
					<EditProfile />
				</CardBody>
			</Card>
		</>
	)
}

export default EditProfilePage
