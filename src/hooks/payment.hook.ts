import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { createPayment } from "../services/paymentServices"

export const usePayment = () => {
	return useMutation<any>({
		mutationKey: ["PAYMENT"],
		mutationFn: async (payData) => await createPayment(payData),
		onSuccess: (data) => {
			toast.success(data.message || "Payment successful")
		},
		onError: (error: any) => {
			toast.error("Payment failed")
		},
	})
}
