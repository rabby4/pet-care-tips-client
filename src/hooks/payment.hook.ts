import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { createPayment } from "../services/paymentServices"

// the backend identifies the user from the auth token and uses a fixed price,
// so the mutation takes no input
export const usePayment = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return useMutation<any, Error, void>({
		mutationKey: ["PAYMENT"],
		mutationFn: async () => await createPayment(),
		onSuccess: (data) => {
			toast.success(data.message || "Payment session created")
		},
		onError: (error) => {
			toast.error(error.message || "Payment failed")
		},
	})
}
