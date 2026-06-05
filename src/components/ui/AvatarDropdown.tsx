"use client"
import { useUser } from "@/src/context/user.provider"
import { logOut } from "@/src/services/authServices"
import { TUser } from "@/src/types"
import { Avatar } from "@nextui-org/avatar"
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/dropdown"
import Link from "next/link"
import { useRouter } from "next/navigation"

const AvatarDropdown = ({ user }: { user: TUser }) => {
	const { setUser } = useUser()
	const router = useRouter()

	const handleLogout = async () => {
		await logOut()
		// clear the client state and refresh so the UI updates immediately
		setUser(null)
		router.push("/")
		router.refresh()
	}

	return (
		<div className="flex items-center gap-4">
			<Dropdown placement="bottom-end">
				<DropdownTrigger>
					<Avatar
						as="button"
						className="transition-transform"
						src={
							user?.image ? user.image : "https://i.ibb.co.com/H7zTvh7/user.png"
						}
					/>
				</DropdownTrigger>
				<DropdownMenu aria-label="Profile Actions" variant="flat">
					<DropdownItem key="email" className="h-14 gap-2">
						<p className="font-semibold">Signed in as</p>
						<p className="font-semibold">{user?.email}</p>
					</DropdownItem>
					<DropdownItem key="profile">
						<Link href={"/profile"}>Profile</Link>
					</DropdownItem>
					<DropdownItem key="feed">
						<Link href={"/profile/feed"}>My Feed</Link>
					</DropdownItem>
					<DropdownItem key="add_post">
						<Link href={"/profile/add-post"}>Add Post</Link>
					</DropdownItem>
					<DropdownItem key="edit_profile">
						<Link href={"/profile/edit-profile"}>Edit Profile</Link>
					</DropdownItem>
					<DropdownItem key="logout" color="danger" onClick={handleLogout}>
						Log Out
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	)
}

export default AvatarDropdown
