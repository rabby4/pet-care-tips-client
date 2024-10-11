// "use client"
// import { useUser } from "@/src/context/user.provider"
// import { useUpdatePost } from "@/src/hooks/post.hook"
// import { Button } from "@nextui-org/button"
// import { Card, CardBody } from "@nextui-org/card"
// import { ChangeEvent, useEffect, useState } from "react"
// import ReactQuill from "react-quill"
// import { toast } from "sonner"
//
// const EditForm = ({ id }: { id: string }) => {
// 	const [isClient, setIsClient] = useState(false)
// 	const { user } = useUser()
// 	const [value, setValue] = useState("")
// 	const [imageFile, setImageFiles] = useState<File | undefined>()
// 	const [imagePreviews, setImagePreviews] = useState<string | null>()
// 	const [selectedValue, setSelectedValue] = useState("")
// 	const { mutate: handleUpdatePost } = useUpdatePost()
//
// 	const handleSubmit = (e: any) => {
// 		e.preventDefault()
// 		if (!user) {
// 			return toast.error("You are not logged in!")
// 		}
// 		const formData = new FormData()
//
// 		const post = { content: value, category: selectedValue }
//
// 		formData.append("data", JSON.stringify(post))
// 		formData.append("image", imageFile as File)
//
// 		handleUpdatePost({ id, formData })
// 	}
//
// 	const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
// 		setSelectedValue(e.target.value)
// 	}
//
// 	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
// 		const file = e.target.files![0]
//
// 		setImageFiles(file)
// 		if (file) {
// 			const reader = new FileReader()
//
// 			reader.onloadend = () => {
// 				setImagePreviews(reader.result as string)
// 			}
// 			reader.readAsDataURL(file)
// 		}
// 	}
//
// 	useEffect(() => {
// 		setIsClient(true)
// 	}, [])
//
// 	if (!isClient) {
// 		return null
// 	}
//
// 	return (
// 		<Card className="mb-5 p-5">
// 			<CardBody>
// 				<form className="flex flex-col" onSubmit={handleSubmit}>
// 					<ReactQuill theme="snow" value={value} onChange={setValue} />
// 					<div className="flex md:flex-row flex-col gap-3 justify-between items-center mt-5">
// 						<div className="md:w-1/2 w-full">
// 							<select
// 								className="w-full border-[1px] size-full rounded-md block p-3 cursor-pointer border-default-300"
// 								id="category"
// 								name="category"
// 								value={selectedValue}
// 								onChange={handleCategoryChange}
// 							>
// 								<option>Select a category</option>
// 								<option value="tip">Tip</option>
// 								<option value="story">Story</option>
// 							</select>
// 						</div>
// 						<div className="md:w-1/2 w-full">
// 							<label
// 								className="size-full rounded-md block text-center p-3 cursor-pointer border border-dashed border-default-300"
// 								htmlFor="itemImages"
// 							>
// 								Upload Images
// 							</label>
// 							<input
// 								multiple
// 								className="hidden"
// 								id="itemImages"
// 								name="itemImages"
// 								type="file"
// 								onChange={(e) => handleImageChange(e)}
// 							/>
// 						</div>
// 					</div>
// 					<div className="flex gap-5 flex-wrap my-3">
// 						{imagePreviews && (
// 							<img
// 								alt="preview"
// 								className="w-24 h-24 object-cover rounded-md"
// 								src={imagePreviews}
// 							/>
// 						)}
// 					</div>
// 					<Button className="rounded-md" color="primary" type="submit">
// 						Post
// 					</Button>
// 				</form>
// 			</CardBody>
// 		</Card>
// 	)
// }
//
// export default EditForm
"use client"
import { useUser } from "@/src/context/user.provider"
import { useUpdatePost } from "@/src/hooks/post.hook"
import { Button } from "@nextui-org/button"
import { Card, CardBody } from "@nextui-org/card"
import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"
import ReactQuill from "react-quill"
import { toast } from "sonner"

const EditForm = ({ id }: { id: string }) => {
	const [isClient, setIsClient] = useState(false)
	const { user } = useUser()
	const [value, setValue] = useState("")
	const [imageFile, setImageFiles] = useState<File | undefined>()
	const [imagePreviews, setImagePreviews] = useState<string | null>(null)
	const [selectedValue, setSelectedValue] = useState("")
	const [isPremium, setIsPremium] = useState(false) // State for premium checkbox
	const { mutate: handleUpdatePost } = useUpdatePost()

	const handleSubmit = (e: any) => {
		e.preventDefault()

		if (!user) {
			return toast.error("You are not logged in!")
		}

		// Prevent user from updating post to premium if they are not premium
		if (isPremium && !user.premium) {
			return toast.error("You must be a premium user to make a post premium!")
		}

		const formData = new FormData()

		const post = {
			content: value,
			category: selectedValue,
			premium: isPremium, // Include premium status in the post data
		}

		formData.append("data", JSON.stringify(post))
		if (imageFile) {
			formData.append("image", imageFile)
		}

		handleUpdatePost({ id, formData })
	}

	const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedValue(e.target.value)
	}

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0]

		setImageFiles(file)
		if (file) {
			const reader = new FileReader()

			reader.onloadend = () => {
				setImagePreviews(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const handlePremiumChange = (e: ChangeEvent<HTMLInputElement>) => {
		setIsPremium(e.target.checked) // Update state based on checkbox
	}

	useEffect(() => {
		setIsClient(true)
	}, [])

	if (!isClient) {
		return null
	}

	return (
		<Card className="mb-5 p-5">
			<CardBody>
				<form className="flex flex-col" onSubmit={handleSubmit}>
					<ReactQuill theme="snow" value={value} onChange={setValue} />
					<div className="flex md:flex-row flex-col gap-3 justify-between items-center mt-5">
						<div className="md:w-1/2 w-full">
							<select
								className="w-full border-[1px] size-full rounded-md block p-3 cursor-pointer border-default-300"
								id="category"
								name="category"
								value={selectedValue}
								onChange={handleCategoryChange}
							>
								<option>Select a category</option>
								<option value="tip">Tip</option>
								<option value="story">Story</option>
							</select>
						</div>
						<div className="md:w-1/2 w-full">
							<label
								className="size-full rounded-md block text-center p-3 cursor-pointer border border-dashed border-default-300"
								htmlFor="itemImages"
							>
								Upload Images
							</label>
							<input
								multiple
								className="hidden"
								id="itemImages"
								name="itemImages"
								type="file"
								onChange={(e) => handleImageChange(e)}
							/>
						</div>
					</div>
					<div className="flex gap-5 flex-wrap my-3">
						{imagePreviews && (
							<img
								alt="preview"
								className="w-24 h-24 object-cover rounded-md"
								src={imagePreviews}
							/>
						)}
					</div>

					{/* Checkbox for premium status */}
					<div className="mt-5">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={isPremium}
								onChange={handlePremiumChange}
								disabled={!user?.premium} // Disable checkbox if user is not premium
							/>
							<span>Mark as Premium</span>
						</label>
						{!user?.premium && (
							<>
								<p className="text-red-500 text-sm">
									Only premium users can mark a post as premium.
								</p>
								<p className="text-sm">
									To be a premium member to click{" "}
									<Link href={"/pricing"} className="text-primary underline">
										here
									</Link>
								</p>
							</>
						)}
					</div>

					<Button className="rounded-md mt-5" color="primary" type="submit">
						Update Post
					</Button>
				</form>
			</CardBody>
		</Card>
	)
}

export default EditForm
