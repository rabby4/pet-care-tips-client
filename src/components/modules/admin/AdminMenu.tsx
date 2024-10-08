"use client"
import { Listbox, ListboxItem } from "@nextui-org/listbox"
import React from "react"
import Link from "next/link"
import {
	BellRing,
	Cog,
	LayoutDashboard,
	LayoutList,
	MessagesSquare,
	User,
	Users,
} from "lucide-react"
import { logOut } from "@/src/services/authServices"

const AdminMenu = () => {
	const handleLogout = () => {
		logOut()
	}

	return (
		<Listbox aria-label="Listbox menu with icons" variant="faded">
			<ListboxItem
				key="admin"
				className="hover:border-0 border-0 py-2"
				startContent={<LayoutDashboard size={20} />}
				textValue="admin"
			>
				<Link href={"/admin"}>Dashboard</Link>
			</ListboxItem>
			<ListboxItem
				key="profile"
				className="hover:border-0 border-0 py-2"
				startContent={<User size={20} />}
				textValue="profile"
			>
				<Link href={"/profile"}>Profile</Link>
			</ListboxItem>
			<ListboxItem
				key="users"
				className="hover:border-0 border-0 p-2"
				startContent={<Users size={20} />}
				textValue="users"
			>
				<Link href={"/admin/users"}>All Users</Link>
			</ListboxItem>
			<ListboxItem
				key="posts"
				className="hover:border-0 border-0 p-2"
				startContent={<LayoutList size={20} />}
				textValue="posts"
			>
				<Link href={"/admin/all-posts"}>All Posts</Link>
			</ListboxItem>
			<ListboxItem
				key="settings"
				className="hover:border-0 border-0 p-2"
				startContent={<Cog size={20} />}
				textValue="settings"
			>
				<Link href={"/profile"}>Settings</Link>
			</ListboxItem>
			<ListboxItem
				key="logout"
				className="hover:border-0 border-0 p-2"
				color="danger"
				startContent={<User size={20} />}
				textValue="logout"
				onClick={() => handleLogout()}
			>
				<p className="p-0">Logout</p>
			</ListboxItem>
		</Listbox>
	)
}

export default AdminMenu
