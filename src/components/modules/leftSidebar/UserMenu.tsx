"use client"
import { Listbox, ListboxItem } from "@nextui-org/listbox"
import React from "react"
import Link from "next/link"
import {
	BellRing,
	Calculator,
	CircleDollarSign,
	Cog,
	LayoutDashboard,
	MessagesSquare,
	PenBox,
	User,
} from "lucide-react"
import { logOut } from "@/src/services/authServices"
import { TUser } from "@/src/types"

const UserMenu = ({ user }: { user: TUser }) => {
	const handleLogout = () => {
		logOut()
	}

	return (
		<>
			{user.role === "admin" ? (
				<>
					<Listbox aria-label="Listbox menu with icons" variant="faded">
						<ListboxItem
							key="dashboard"
							className="hover:border-0 border-0 py-2"
							startContent={<LayoutDashboard size={20} />}
							textValue="dashboard"
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
							key="nutrition"
							className="hover:border-0 border-0 py-2"
							startContent={<User size={20} />}
							textValue="nutrition"
						>
							<Link href={"/nutrition"}>Calculate Nutrition</Link>
						</ListboxItem>
						<ListboxItem
							key="edit-profile"
							className="hover:border-0 border-0 p-2"
							startContent={<PenBox size={20} />}
							textValue="edit-profile"
						>
							<Link aria-current="page" href="/profile/edit-profile">
								Edit Profile
							</Link>
						</ListboxItem>
						<ListboxItem
							key="pricing"
							className="hover:border-0 border-0 p-2"
							startContent={<CircleDollarSign size={20} />}
							textValue="pricing"
						>
							<Link href={"/pricing"}>Pricing</Link>
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
				</>
			) : (
				<>
					<Listbox aria-label="Listbox menu with icons" variant="faded">
						<ListboxItem
							key="profile"
							className="hover:border-0 border-0 py-2"
							startContent={<User size={20} />}
							textValue="profile"
						>
							<Link href={"/profile"}>Profile</Link>
						</ListboxItem>
						<ListboxItem
							key="nutrition"
							className="hover:border-0 border-0 py-2"
							startContent={<Calculator size={20} />}
							textValue="nutrition"
						>
							<Link href={"/nutrition"}>Calculate Nutrition</Link>
						</ListboxItem>
						<ListboxItem
							key="edit-profile"
							className="hover:border-0 border-0 p-2"
							startContent={<PenBox size={20} />}
							textValue="edit-profile"
						>
							<Link aria-current="page" href="/profile/edit-profile">
								Edit Profile
							</Link>
						</ListboxItem>
						<ListboxItem
							key="pricing"
							className="hover:border-0 border-0 p-2"
							startContent={<CircleDollarSign size={20} />}
							textValue="pricing"
						>
							<Link href={"/pricing"}>Pricing</Link>
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
				</>
			)}
		</>
	)
}

export default UserMenu
