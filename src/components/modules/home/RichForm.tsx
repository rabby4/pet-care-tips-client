"use client"
import { useUser } from "@/src/context/user.provider"
import { useCreatePost } from "@/src/hooks/post.hook"
import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { Input } from "@nextui-org/input"
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/modal"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"
import "react-quill/dist/quill.snow.css"
import { toast } from "sonner"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const RichForm = () => {
	const [isClient, setIsClient] = useState(false)
	const { user } = useUser()
	const [value, setValue] = useState("")
	const [imageFile, setImageFiles] = useState<File | undefined>()
	const [imagePreviews, setImagePreviews] = useState<string | null>()
	const [selectedValue, setSelectedValue] = useState("")
	const { mutate: handleCreatePost } = useCreatePost()
	const [isPremium, setIsPremium] = useState(false)
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const handleSubmit = (e: any) => {
		e.preventDefault()
		if (!user) {
			return toast.error("You are not logged in!")
		}
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
		<>
			<Card className="mb-5 p-3">
				<CardBody>
					<Button onPress={onOpen} className="bg-transparent p-0">
						<Avatar
							className="transition-transform"
							src={
								user?.image
									? user?.image
									: "https://i.ibb.co.com/H7zTvh7/user.png"
							}
						/>
						<Input placeholder={`What's on your mind ${user?.firstName}`} />
					</Button>
					<Modal
						size="2xl"
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						className="p-5"
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">
										Write your tips or story and publish
									</ModalHeader>
									<ModalBody>
										<Card shadow="none" radius="none">
											<CardBody className="p-0">
												<form className="flex flex-col" onSubmit={handleSubmit}>
													<ReactQuill
														theme="snow"
														value={value}
														onChange={setValue}
													/>
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
													<div className="mb-5">
														<label className="flex items-center gap-2">
															<input
																checked={isPremium}
																disabled={!user?.premium} // Disable checkbox if user is not premium
																type="checkbox"
																onChange={handlePremiumChange}
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
																	<Link
																		className="text-primary underline"
																		href={"/pricing"}
																	>
																		here
																	</Link>
																</p>
															</>
														)}
													</div>

													<Button
														className="rounded-md"
														color="primary"
														type="submit"
													>
														Post
													</Button>
												</form>
											</CardBody>
										</Card>
									</ModalBody>
								</>
							)}
						</ModalContent>
					</Modal>
				</CardBody>
			</Card>
		</>
	)
}

export default RichForm
