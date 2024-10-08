"use client"
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
} from "@nextui-org/table"
import { columns, users } from "../../../../../../public/data"
import React from "react"
import { Eye, PencilLine } from "lucide-react"
import { Tooltip } from "@nextui-org/tooltip"
import { ChipVariantProps } from "@nextui-org/theme"
import { DeleteIcon } from "@/src/components/icons"
import { User } from "@nextui-org/user"
import { Chip } from "@nextui-org/chip"
import { getAllUsers } from "@/src/services/authServices"

const statusColorMap: Record<string, ChipVariantProps["color"]> = {
	active: "success",
	paused: "danger",
	vacation: "warning",
}

type User = (typeof users)[0]

const UsersPage = () => {
	// const allUsers = await getAllUsers()

	const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
		const cellValue = user[columnKey as keyof User]

		switch (columnKey) {
			case "name":
				return (
					<User
						avatarProps={{ radius: "lg", src: user.avatar }}
						description={user.email}
						name={cellValue}
					>
						{user.email}
					</User>
				)
			case "role":
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize">{cellValue}</p>
						<p className="text-bold text-sm capitalize text-default-400">
							{user.team}
						</p>
					</div>
				)
			case "status":
				return (
					<Chip
						className="capitalize"
						color={statusColorMap[user.status]}
						size="sm"
						variant="flat"
					>
						{cellValue}
					</Chip>
				)
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip content="Details">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<Eye />
							</span>
						</Tooltip>
						<Tooltip content="Edit user">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<PencilLine />
							</span>
						</Tooltip>
						<Tooltip color="danger" content="Delete user">
							<span className="text-lg text-danger cursor-pointer active:opacity-50">
								<DeleteIcon />
							</span>
						</Tooltip>
					</div>
				)
			default:
				return cellValue
		}
	}, [])

	return (
		<>
			<Table aria-label="Example table with custom cells">
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							key={column.uid}
							align={column.uid === "actions" ? "center" : "start"}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={users}>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => (
								<TableCell>{renderCell(item, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	)
}

export default UsersPage
