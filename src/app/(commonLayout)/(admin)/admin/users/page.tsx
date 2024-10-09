"use client"
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@nextui-org/table"
import React from "react"
import { Eye, PencilLine } from "lucide-react"
import { Tooltip } from "@nextui-org/tooltip"
import { DeleteIcon } from "@/src/components/icons"
import { User } from "@nextui-org/user"
import { Chip } from "@nextui-org/chip"
import { useEffect, useState } from "react"
import { getAllUsers } from "@/src/services/authServices"
import { TUser } from "@/src/types"
import { useDeleteUser } from "@/src/hooks/auth.hooks"

const UsersPage = () => {
	const [users, setUsers] = useState<TUser[]>([])
	const { mutate: handleDeleteUser } = useDeleteUser()

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await getAllUsers()

			setUsers(response)
		}

		fetchUsers()
	}, [])

	const handleDelete = (id: string) => {
		handleDeleteUser(id)
	}

	const renderCell = React.useCallback((user: TUser, columnKey: React.Key) => {
		const cellValue = user[columnKey as keyof TUser]

		switch (columnKey) {
			case "name":
				return (
					<div>
						<User
							name={`${user.firstName} ${user.lastName}`}
							description={user?.occupation}
							avatarProps={{
								src: `${user.image}`,
							}}
						/>
					</div>
				)
			case "role":
				return (
					<div className="flex flex-col">
						<p className="font-bold text-sm capitalize">{user.role}</p>
					</div>
				)
			case "premium":
				return (
					<Chip
						className="capitalize"
						color={user.premium ? "success" : "default"}
						size="sm"
						variant="flat"
					>
						{user.premium ? "Premium" : "Standard"}
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
							<button
								onClick={() => handleDelete(user._id)}
								className="text-lg text-danger cursor-pointer active:opacity-50"
							>
								<DeleteIcon />
							</button>
						</Tooltip>
					</div>
				)
			default:
				return cellValue
		}
	}, [])

	if (!users?.length) return <p>Loading...</p>

	const columns = [
		{ uid: "name", name: "Name" },
		{ uid: "email", name: "Email" },
		{ uid: "role", name: "Role" },
		{ uid: "premium", name: "Premium Status" },
		{ uid: "actions", name: "Actions" },
	]

	return (
		<>
			<Table aria-label="Users table">
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
						<TableRow key={item._id}>
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
