"use client"
import Loading from "@/src/components/ui/Loading"
import { useUser } from "@/src/context/user.provider"
import { useLogin } from "@/src/hooks/auth.hooks"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import React, { Suspense, useState } from "react"
import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form"

const LoginForm = () => {
	const { mutate: handleLogin, isPending } = useLogin()
	const { setIsLoading: refreshUser } = useUser()
	const router = useRouter()
	const searchParams = useSearchParams()
	const { handleSubmit, control } = useForm({})
	const [isVisible, setIsVisible] = useState(false)

	const toggleVisibility = () => setIsVisible(!isVisible)

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		handleLogin(data, {
			onSuccess: () => {
				// refresh the user context, then navigate
				refreshUser(true)
				// only follow same-site relative paths (prevents open redirects)
				const raw = searchParams.get("redirect")
				const redirect =
					raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : "/"

				router.push(redirect)
				router.refresh()
			},
		})
	}

	return (
		<>
			{isPending && <Loading />}
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
							<Button className="mt-5 rounded-md" color="primary" type="submit">
								Login
							</Button>
						</form>
					</CardBody>
					<CardFooter className="flex-col gap-5">
						<p className="text-sm text-center">
							Don&rsquo;t have an account?
							<Link
								className="underline hover:text-primary-500"
								href="/register"
							>
								Register
							</Link>
						</p>
						<p className="text-sm text-center">
							If you already have an account but forget the password then click{" "}
							<Link
								className="text-sm underline place-self-start text-primary"
								href="/forget-password"
							>
								here
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</>
	)
}

const LoginPage = () => {
	return (
		<Suspense fallback={<Loading />}>
			<LoginForm />
		</Suspense>
	)
}

export default LoginPage
