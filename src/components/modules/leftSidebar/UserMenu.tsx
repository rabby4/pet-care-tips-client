"use client"
import { Listbox, ListboxItem } from "@nextui-org/listbox"
import React from "react"
import Link from "next/link"
import { BellRing, Cog, MessagesSquare, User } from "lucide-react"
import { logOut } from "@/src/services/authServices"

const UserMenu = () => {
	const handleLogout = () => {
		logOut()
	}

	return (
		<Listbox aria-label="Listbox menu with icons" variant="faded">
			<ListboxItem
				key="profile"
				className="hover:border-0 border-0 py-2"
				startContent={<User size={20} />}
			>
				<Link href={"/profile"}>Profile</Link>
			</ListboxItem>
			<ListboxItem
				key="messages"
				className="hover:border-0 border-0 p-2"
				startContent={<MessagesSquare size={20} />}
			>
				<Link href={"/profile"}>Messages</Link>
			</ListboxItem>
			<ListboxItem
				key="notifications"
				className="hover:border-0 border-0 p-2"
				startContent={<BellRing size={20} />}
			>
				<Link href={"/profile"}>Notifications</Link>
			</ListboxItem>
			<ListboxItem
				key="settings"
				className="hover:border-0 border-0 p-2"
				startContent={<Cog size={20} />}
			>
				<Link href={"/profile"}>Settings</Link>
			</ListboxItem>
			<ListboxItem
				key="logout"
				className="hover:border-0 border-0 p-2"
				color="danger"
				startContent={<User size={20} />}
				onClick={() => handleLogout()}
			>
				<p className="p-0">Logout</p>
			</ListboxItem>
		</Listbox>
	)
}

export default UserMenu