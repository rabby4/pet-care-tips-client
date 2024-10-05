"use client"
import Container from "@/src/components/ui/Container"
import Loading from "@/src/components/ui/Loading"
import { useRegistrations } from "@/src/hooks/auth.hooks"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { ChangeEvent, useState } from "react"
import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form"

const RegisterPage = () => {
	const [imageFile, setImageFile] = useState<File | undefined>()
	const { mutate: handleRegistration, isPending } = useRegistrations()
	const { handleSubmit, control } = useForm({})

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const formData = new FormData()

		formData.append("data", JSON.stringify(data))
		formData.append("image", imageFile as File)
		handleRegistration(formData)
	}

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0]

		setImageFile(file)
	}

	return (
		<>
			{isPending && <Loading />}
			<Container>
				<form onSubmit={handleSubmit(onSubmit)}>
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
					{/* <Controller
						control={control}
						name="image"
						render={({ field }) => (
							<Input
								label="Image"
								type="file"
								variant={"underlined"}
								{...field}
							/>
						)}
						rules={{ required: true }}
					/> */}

					<label
						htmlFor="image"
						className="size-full bg-default-100 rounded-md block text-center p-3 cursor-pointer border border-dashed border-default-300"
					>
						Upload Images
					</label>
					<input
						type="file"
						id="image"
						name="image"
						className="hidden"
						onChange={(e) => handleImageChange(e)}
					/>

					<Button type="submit">Register</Button>
				</form>
			</Container>
		</>
	)
}

export default RegisterPage
