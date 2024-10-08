"use client"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { Select, SelectItem } from "@nextui-org/select"
import React, { useEffect, useState } from "react"

const Filter = () => {
	const [search, setSearch] = useState("")
	const [category, setCategory] = useState("")
	const [params, setParams] = useState<any>([])

	useEffect(() => {
		const params = []

		if (category) {
			params.push({ name: "category", value: category })
		}
		if (search) {
			params.push({ name: "search", value: search })
		}

		setParams(params)
	}, [category, search])

	const handleSearch = (e: any) => {
		setSearch(e.target.value)
	}

	const handleCategoryChange = (e: any) => {
		setCategory(e.target.value)
	}

	return (
		<>
			<Card className="rounded-md p-5">
				<CardHeader>
					<h3 className="text-xl font-bold">Filter</h3>
				</CardHeader>
				<CardBody className="flex flex-row gap-5 justify-between">
					<div className="w-1/2">
						<Input
							className="rounded-md"
							label="Search..."
							type="text"
							variant="underlined"
							onChange={handleSearch}
						/>
					</div>
					<div className="w-1/2">
						<Select
							className="rounded-md"
							label="Select an animal"
							variant="underlined"
							onChange={handleCategoryChange}
						>
							<SelectItem key={"tips"} value={"tips"}>
								Tips
							</SelectItem>
							<SelectItem key={"story"} value={"story"}>
								Story
							</SelectItem>
						</Select>
					</div>
				</CardBody>
			</Card>
		</>
	)
}

export default Filter
