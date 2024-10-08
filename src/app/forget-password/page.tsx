"use client"
import { useForgetPassword } from "@/src/hooks/auth.hooks"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import React from "react"
import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form"

const ForgetPassword = () => {
	const { mutate: handleForgetPassword } = useForgetPassword()
	const { handleSubmit, control } = useForm({})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		handleForgetPassword(data)
	}

	return (
		<div className=" flex justify-center items-center h-screen w-screen">
			<Card className="p-10 w-1/4">
				<CardHeader className=" flex-col items-start gap-2">
					<h2 className="text-3xl font-bold">Enter your email</h2>
				</CardHeader>
				<CardBody>
					<form
						className="flex flex-col gap-2"
						onSubmit={handleSubmit(onSubmit)}
					>
						<Controller
							control={control}
							name="email"
							render={({ field }) => (
								<Input
									label="Email"
									type="email"
									variant={"underlined"}
									{...field}
								/>
							)}
							rules={{ required: true }}
						/>

						<Button className="mt-5 rounded-md" color="primary" type="submit">
							Verify Email
						</Button>
					</form>
				</CardBody>
			</Card>
		</div>
	)
}

export default ForgetPassword
