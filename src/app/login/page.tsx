"use client"
import Container from "@/src/components/ui/Container"
import { useLogin } from "@/src/hooks/auth.hooks"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { useRouter } from "next/navigation"
import React from "react"
import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form"

const LoginPage = () => {
	const { mutate: handleLogin, isPending, isSuccess } = useLogin()
	const router = useRouter()
	const { handleSubmit, control } = useForm({})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		handleLogin(data)
	}

	if (!isPending && isSuccess) {
		router.push("/")
	}

	return (
		<Container>
			<form onSubmit={handleSubmit(onSubmit)}>
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
				<Controller
					control={control}
					name="password"
					render={({ field }) => (
						<Input
							label="Password"
							type="password"
							variant={"underlined"}
							{...field}
						/>
					)}
					rules={{ required: true }}
				/>
				<Button type="submit">Login</Button>
			</form>
		</Container>
	)
}

export default LoginPage
