import { useForm } from "react-hook-form"

const RichForm = () => {
	// Use the `useForm` hook to manage the form state
	const { handleSubmit, control, formState } = useForm({
		defaultValues: {
			post: "", // Default value for the post content
		},
		mode: "onTouched", // Run validation on touch
	})

	// Simplified form submission handler
	const onSubmit = (data: any) => {
		console.log("Submitted data:", data)
	}

	return (
		<div className="max-w-3xl mx-auto py-5">
			<Form>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormField
						control={control}
						name="post"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Post</FormLabel>
								<FormControl>
									<RichTextEditor
										content={field.value} // Bind the editor value to form field
										onChange={(value) => field.onChange(value)} // Update form field when editor changes
									/>
								</FormControl>
								{/* Display validation error messages */}
								{formState.errors.post && (
									<FormMessage>{formState.errors.post.message}</FormMessage>
								)}
							</FormItem>
						)}
					/>
					<Button type="submit" className="mt-4">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default RichForm
