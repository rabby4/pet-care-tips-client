"use client"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import React from "react"
import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form"

const EditProfile = () => {
	const { handleSubmit, control } = useForm({})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log(data)
	}

	return (
		<>
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
				<Button type="submit">Register</Button>
			</form>
		</>
	)
}

export default EditProfile
