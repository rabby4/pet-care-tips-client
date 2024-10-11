"use client"
import { Button } from "@nextui-org/button"
import { useDisclosure } from "@nextui-org/modal"
import { Modal as MyModal, ModalContent, ModalBody } from "@nextui-org/modal"
import Link from "next/link"

const Modal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<div>
			<Button className="p-0 bg-transparent text-primary-600" onPress={onOpen}>
				Read more
			</Button>
			<MyModal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{() => (
						<>
							<ModalBody className="flex flex-cols gap-3 p-10 justify-center text-center">
								<h1 className="text-2xl font-semibold">
									You are not a premium member
								</h1>
								<p>
									To access this feature, please upgrade to a premium account.
								</p>
								<Button color="primary">
									<Link href={"/pricing"}>Upgrade Membership</Link>
								</Button>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</MyModal>
		</div>
	)
}

export default Modal
