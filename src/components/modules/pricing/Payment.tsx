"use client"
import { title } from "@/src/components/primitives"
import Container from "@/src/components/ui/Container"
import { usePayment } from "@/src/hooks/payment.hook"
import { TUser } from "@/src/types"
import { Button } from "@nextui-org/button"
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

	console.log(data?.data?.paymentSession?.payment_url)

	useEffect(() => {
		if (data?.data?.paymentSession?.result) {
			router.push(data?.data?.paymentSession?.payment_url)
		}
	}, [data])

	return (
		<Container>
			<h1 className={title()}>Pricing</h1>
			<p>
				We offer various pet care packages at affordable prices. Feel free to
				explore our options and find the best fit for your pet.
			</p>
			<Button onClick={handleSubmit}>Make Payments</Button>
		</Container>
	)
}

export default Payment
