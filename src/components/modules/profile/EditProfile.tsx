"use client"
import { useUser } from "@/src/context/user.provider"
import { useUpdateUser } from "@/src/hooks/auth.hooks"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Input, Textarea } from "@nextui-org/input"
import { ChangeEvent, useState } from "react"
import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form"
import Loading from "../../ui/Loading"
import { DateInput } from "@nextui-org/date-input"
import dateToISO from "@/src/utils/dateToISO"

const EditProfile = () => {
	const [imageFile, setImageFile] = useState<File | undefined>()
	const [imagePreviews, setImagePreviews] = useState<string | null>()
	const { mutate: handleUpdateUser, isPending } = useUpdateUser()
	const { handleSubmit, control, reset } = useForm({})
	const { user } = useUser()

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const formData = new FormData()

		const userData = {
			...data,
			dateOfBirth: dateToISO(data.dateOfBirth),
		}

		formData.append("data", JSON.stringify(userData))
		formData.append("image", imageFile as File)

		const userInfo = {
			id: user?._id,
			formData,
		}

		handleUpdateUser(userInfo)
		reset()
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

	return (
		<>
			{isPending && <Loading />}
			<div className="mb-10">
				<Card className="p-10">
					<CardHeader className=" flex-col gap-2">
						<h2 className="text-3xl font-bold">Edit Profile</h2>
						<p className="text-sm">
							Enter your information below to Edit your account!
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
								/>
								<Controller
									control={control}
									name="occupation"
									render={({ field }) => (
										<Input
											label="Occupation"
											type="text"
											variant={"underlined"}
											{...field}
										/>
									)}
								/>
							</div>
							<div className="grid grid-cols-2 gap-5">
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
								/>
								<Controller
									control={control}
									name="dateOfBirth"
									render={({ field }) => (
										<DateInput
											label="Date of Birth"
											variant={"underlined"}
											{...field}
										/>
									)}
								/>
							</div>

							<Controller
								control={control}
								name="about"
								render={({ field }) => (
									<Textarea
										label="Overview"
										type="text"
										variant={"underlined"}
										{...field}
									/>
								)}
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
								Update Profile
							</Button>
						</form>
					</CardBody>
				</Card>
			</div>
		</>
	)
}

export default EditProfile
