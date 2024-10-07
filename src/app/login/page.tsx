"use client"
import Loading from "@/src/components/ui/Loading"
import { useLogin } from "@/src/hooks/auth.hooks"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { EyeIcon, EyeOffIcon, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
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
	const [isVisible, setIsVisible] = useState(false)

	const toggleVisibility = () => setIsVisible(!isVisible)

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		handleLogin(data)
	}

	if (!isPending && isSuccess) {
		router.push("/")
	}

	return (
		<>
			{isPending && <Loading />}
			<>
				<div className=" flex justify-center items-center h-screen w-screen">
					<Card className="p-10 w-1/4">
						<CardHeader className=" flex-col items-start gap-2">
							<h2 className="text-3xl font-bold">Login</h2>
							<p className="text-sm">
								Enter your email and password below to login to your account
							</p>
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
								<Button
									className="mt-5 rounded-md"
									color="primary"
									type="submit"
								>
									Login
								</Button>
							</form>
						</CardBody>
						<CardFooter className="flex-col gap-5">
							<div className="flex gap-5">
								<Button
									className="rounded-md hover:text-[#d62d20]"
									startContent={<Mail color="#d62d20" size={16} />}
									variant="bordered"
								>
									Login With Google
								</Button>
								<Button
									className="rounded-md hover:text-[#2b3137]"
									startContent={<Mail color="#2b3137" size={16} />}
									variant="bordered"
								>
									Login With Github
								</Button>
							</div>
							<p className="text-sm text-center">
								Don&rsquo;t have an account?
								<Link
									className="underline hover:text-primary-500"
									href="/register"
								>
									Register
								</Link>
							</p>
						</CardFooter>
					</Card>
				</div>
			</>
		</>
	)
}

export default LoginPage
