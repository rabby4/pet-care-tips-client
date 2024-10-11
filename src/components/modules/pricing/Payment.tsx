"use client"
import Container from "@/src/components/ui/Container"
import { usePayment } from "@/src/hooks/payment.hook"
import { TUser } from "@/src/types"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Listbox, ListboxItem } from "@nextui-org/listbox"
import { BadgeCheck, Notebook, PencilLine } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Payment = ({ user }: { user: TUser }) => {
	const { mutate: handlePayment, data } = usePayment()
	const router = useRouter()

	const handleSubmit = () => {
		const payData: any = {
			email: user.email,
			amount: 100,
		}

		handlePayment(payData)
	}

	useEffect(() => {
		if (data?.data?.paymentSession?.result) {
			router.push(data?.data?.paymentSession?.payment_url)
		}
	}, [data])

	return (
		<Container>
			<div className="w-1/3 mx-auto h-[calc(100vh-100px)] flex items-center">
				<Card className="px-5 py-10">
					<CardHeader className="flex-col text-center gap-2">
						<h1 className={"text-3xl font-semibold uppercase"}>Pricing</h1>
						<p className="text-sm">
							We offer various pet care packages at affordable prices. Feel free
							to explore our options and find the best fit for your pet.
						</p>
						<h1 className="text-3xl font-semibold text-primary mt-5">
							<sup>$</sup>100
						</h1>
					</CardHeader>
					<CardBody>
						<Listbox aria-label="Listbox menu with descriptions" variant="flat">
							<ListboxItem
								key="new"
								description="You will access premium content access"
								startContent={<Notebook />}
							>
								Premium Content
							</ListboxItem>
							<ListboxItem
								key="premium"
								description="Added a verify badge on your profile"
								startContent={<BadgeCheck />}
							>
								Verify Profile
							</ListboxItem>
							<ListboxItem
								key="edit"
								showDivider
								description="You can also post premium content to your account"
								startContent={<PencilLine />}
							>
								Post Premium Content
							</ListboxItem>
						</Listbox>
					</CardBody>
					<CardFooter className="flex">
						<Button
							className="rounded-md flex-1"
							color="primary"
							onClick={handleSubmit}
						>
							Make Payments
						</Button>
					</CardFooter>
				</Card>
			</div>
		</Container>
	)
}

export default Payment
