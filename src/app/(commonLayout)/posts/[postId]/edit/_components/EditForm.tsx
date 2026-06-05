"use client"
import { useUser } from "@/src/context/user.provider"
import { useUpdatePost } from "@/src/hooks/post.hook"
import { TPost } from "@/src/types"
import { Button } from "@nextui-org/button"
import { Card, CardBody } from "@nextui-org/card"
import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import dynamic from "next/dynamic"
import { toast } from "sonner"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const EditForm = ({ id, post }: { id: string; post?: TPost }) => {
	const { user } = useUser()
	// pre-populate the form with the existing post so updating
	// doesn't wipe the content/category/premium values
	const [value, setValue] = useState(post?.content ?? "")
	const [imageFile, setImageFiles] = useState<File | undefined>()
	const [imagePreviews, setImagePreviews] = useState<string | null>(null)
	const [selectedValue, setSelectedValue] = useState(post?.category ?? "")
	const [isPremium, setIsPremium] = useState(!!post?.premium)
	const { mutate: handleUpdatePost } = useUpdatePost()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!user) {
			return toast.error("You are not logged in!")
		}

		// Prevent user from updating post to premium if they are not premium
		if (isPremium && !post?.premium && !user.premium) {
			return toast.error("You must be a premium user to make a post premium!")
		}

		const formData = new FormData()

		const postData = {
			content: value,
			category: selectedValue,
			premium: isPremium, // Include premium status in the post data
		}

		formData.append("data", JSON.stringify(postData))
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
								<option value="">Select a category</option>
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
								checked={isPremium}
								disabled={!user?.premium && !post?.premium}
								type="checkbox"
								onChange={handlePremiumChange}
							/>
							<span>Mark as Premium</span>
						</label>
						{!user?.premium && !post?.premium && (
							<>
								<p className="text-red-500 text-sm">
									Only premium users can mark a post as premium.
								</p>
								<p className="text-sm">
									To be a premium member to click{" "}
									<Link className="text-primary underline" href={"/pricing"}>
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
