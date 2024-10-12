"use client"
import { useResetPassword } from "@/src/hooks/auth.hooks"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form"

const ResetPassword = () => {
	const { mutate: handleReset } = useResetPassword()
	const searchParams = useSearchParams()
	const { handleSubmit, control } = useForm({})
	const [isVisible, setIsVisible] = useState(false)
	const router = useRouter()
	const toggleVisibility = () => setIsVisible(!isVisible)

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const resetData = {
			token: searchParams.get("token"),
			email: searchParams.get("email"),
			newPassword: data.password,
		}

		handleReset(resetData)
		router.push("/login")
	}

	return (
		<div className=" flex justify-center items-center h-screen w-screen">
			<Card className="p-10 w-1/4">
				<CardHeader className=" flex-col items-start gap-2">
					<h2 className="text-3xl font-bold">Rest Your Password</h2>
				</CardHeader>
				<CardBody>
					<form
						className="flex flex-col gap-2"
						onSubmit={handleSubmit(onSubmit)}
					>
						<Controller
							control={control}
							name="password"
							render={({ field }) => (
								<Input
									{...field}
									endContent={
										<button
											aria-label="toggle password visibility"
											className="focus:outline-none"
											type="button"
											onClick={toggleVisibility}
										>
											{isVisible ? (
												<EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
											) : (
												<EyeIcon className="text-2xl text-default-400 pointer-events-none" />
											)}
										</button>
									}
									label="Password"
									type={isVisible ? "text" : "password"}
									variant="underlined"
								/>
							)}
							rules={{ required: true }}
						/>

						<Button className="mt-5 rounded-md" color="primary" type="submit">
							Reset Password
						</Button>
					</form>
				</CardBody>
			</Card>
		</div>
	)
}

export default ResetPassword
