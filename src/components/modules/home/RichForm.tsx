"use client"
import { useUser } from "@/src/context/user.provider"
import { useCreatePost } from "@/src/hooks/post.hook"
import { Button } from "@nextui-org/button"
import { Card, CardBody } from "@nextui-org/card"
import dynamic from "next/dynamic"
import { ChangeEvent, useEffect, useState } from "react"
// import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const RichForm = () => {
	const [isClient, setIsClient] = useState(false)
	const { user } = useUser()
	const [value, setValue] = useState("")
	const [imageFile, setImageFiles] = useState<File | undefined>()
	const [imagePreviews, setImagePreviews] = useState<string | null>()
	const [selectedValue, setSelectedValue] = useState("")
	const { mutate: handleCreatePost } = useCreatePost()

	const handleSubmit = (e: any) => {
		e.preventDefault()
		const formData = new FormData()

		const post = { user: user?._id, content: value, category: selectedValue }

		formData.append("data", JSON.stringify(post))
		formData.append("image", imageFile as File)

		handleCreatePost(formData)
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

	useEffect(() => {
		setIsClient(true)
	}, [])

	if (!isClient) {
		return null
	}

	return (
		<>
			<Card className="mb-5">
				<CardBody>
					<form onSubmit={handleSubmit} className="flex flex-col">
						<ReactQuill theme="snow" value={value} onChange={setValue} />
						<div className="flex gap-3 justify-between items-center mt-5">
							<div className="w-1/2">
								<select
									id="category"
									name="category"
									value={selectedValue}
									onChange={handleCategoryChange}
									className="w-full border-[1px] size-full rounded-md block p-3 cursor-pointer border-default-300"
								>
									<option>Select a category</option>
									<option value="tip">Tip</option>
									<option value="story">Story</option>
								</select>
							</div>
							<div className="w-1/2">
								<label
									htmlFor="itemImages"
									className="size-full rounded-md block text-center p-3 cursor-pointer border border-dashed border-default-300"
								>
									Upload Images
								</label>
								<input
									type="file"
									multiple
									id="itemImages"
									name="itemImages"
									className="hidden"
									onChange={(e) => handleImageChange(e)}
								/>
							</div>
						</div>
						<div className="flex gap-5 flex-wrap my-3">
							{imagePreviews && (
								<img
									src={imagePreviews}
									alt="preview"
									className="w-24 h-24 object-cover rounded-md"
								/>
							)}
						</div>
						<Button color="primary" className="rounded-md" type="submit">
							Post
						</Button>
					</form>
				</CardBody>
			</Card>
		</>
	)
}

export default RichForm
