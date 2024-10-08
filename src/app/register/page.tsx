"use client"
import Loading from "@/src/components/ui/Loading"
import { useRegistrations } from "@/src/hooks/auth.hooks"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form"

const RegisterPage = () => {
	const [imageFile, setImageFile] = useState<File | undefined>()
	const [imagePreviews, setImagePreviews] = useState<string | null>()
	const {
		mutate: handleRegistration,
		isPending,
		isSuccess,
	} = useRegistrations()
	const { handleSubmit, control } = useForm({})
	const router = useRouter()

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const formData = new FormData()

		formData.append("data", JSON.stringify(data))
		formData.append("image", imageFile as File)
		handleRegistration(formData)
	}

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0]

		setImageFile(file)
		if (file) {
			const reader = new FileReader()

			reader.onloadend = () => {
				setImagePreviews(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	if (isSuccess) {
		router.push("/login")
	}

	return (
		<>
			{isPending && <Loading />}
			<div className=" flex justify-center items-center h-screen w-screen">
				<Card className="p-10 w-2/6">
					<CardHeader className=" flex-col items-start gap-2">
						<h2 className="text-3xl font-bold">Registration</h2>
						<p className="text-sm">
							Enter your information below to create to your account!
						</p>
					</CardHeader>
					<CardBody>
						<form
							className="flex flex-col gap-2"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="grid grid-cols-2 gap-5">
								<Controller
									control={control}
									name="firstName"
									render={({ field }) => (
										<Input
											label="Fist Name"
											type="text"
											variant={"underlined"}
											{...field}
										/>
									)}
									rules={{ required: true }}
								/>
								<Controller
									control={control}
									name="lastName"
									render={({ field }) => (
										<Input
											label="Last Name"
											type="text"
											variant={"underlined"}
											{...field}
										/>
									)}
									rules={{ required: true }}
								/>
							</div>
							<div className="grid grid-cols-2 gap-5">
								<Controller
									control={control}
									name="phone"
									render={({ field }) => (
										<Input
											label="Phone Number"
											type="text"
											variant={"underlined"}
											{...field}
										/>
									)}
									rules={{ required: true }}
								/>
								<Controller
									control={control}
									name="address"
									render={({ field }) => (
										<Input
											label="Address"
											type="text"
											variant={"underlined"}
											{...field}
										/>
									)}
									rules={{ required: true }}
								/>
							</div>

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
							<label
								className="size-full bg-default-100 rounded-md block text-center p-3 cursor-pointer border border-dashed border-default-300 mt-2"
								htmlFor="image"
							>
								Upload Images
							</label>
							<input
								className="hidden"
								id="image"
								name="image"
								type="file"
								onChange={(e) => handleImageChange(e)}
							/>

							<div className="flex gap-5 flex-wrap my-3">
								{imagePreviews && (
									<img
										alt="preview"
										className="w-24 h-24 object-cover rounded-md"
										src={imagePreviews}
									/>
								)}
							</div>

							<Button className="rounded-md" color="primary" type="submit">
								Register
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
							Already have an account?
							<Link className="underline hover:text-primary-500" href="/login">
								Login
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</>
	)
}

export default RegisterPage
