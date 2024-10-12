/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Loading from "@/src/components/ui/Loading"
import { getAllUsers } from "@/src/services/authServices"
import { getPaymentHistory } from "@/src/services/paymentServices"
import { TPayment, TUser } from "@/src/types"

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/table"
import React, { useEffect, useState } from "react"

const Payments = () => {
	const [users, setUsers] = useState<TUser[]>([])
	const [payments, setPayments] = useState<TPayment[]>([])
	const [loading, setLoading] = useState(true)

	// Fetch users and payments on component mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				const userResponse = await getAllUsers()
				const paymentResponse = await getPaymentHistory()

				setUsers(userResponse)
				setPayments(paymentResponse)
			} catch (error) {
				console.error("Error fetching data", error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	// Render cells based on column keys
	const renderCell = React.useCallback(
		(payment: TPayment, columnKey: React.Key) => {
			const cellValue = payment[columnKey as keyof TPayment]

			switch (columnKey) {
				case "email":
					return (
						<div className="flex flex-col">
							<p className=" text-sm">{payment.email}</p>
						</div>
					)
				case "trxId":
					return (
						<div className="flex flex-col">
							<p className="text-sm">{payment.trxId}</p>
						</div>
					)
				case "amount":
					return (
						<div className="flex flex-col">
							<p className=" text-sm">{payment.amount}</p>
						</div>
					)
				default:
					return <>{cellValue}</>
			}
		},
		[]
	)

	if (loading) return <Loading />

	// Define the columns for the table
	const columns = [
		{ uid: "email", name: "Email" },
		{ uid: "trxId", name: "Transaction ID" },
		{ uid: "amount", name: "Amount" },
	]

	return (
		<>
			<Table aria-label="Payments Table">
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
				<TableBody items={payments}>
					{(item: TPayment) => (
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

export default Payments
