import Payment from "@/src/components/modules/pricing/Payment"
import { getCurrentUser } from "@/src/services/authServices"

export default async function PricingPage() {
	const user = await getCurrentUser()

	return (
		<>
			<Payment user={user} />
		</>
	)
}
