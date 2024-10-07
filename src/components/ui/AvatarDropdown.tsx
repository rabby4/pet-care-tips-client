"use client"
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

const AvatarDropdown = ({ user }: { user: TUser }) => {
	const handleLogout = () => {
		logOut()
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
			{/* <Dropdown placement="bottom-start">
							<DropdownTrigger>
								<User
									as="button"
									avatarProps={{
										isBordered: true,
										src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
									}}
									className="transition-transform"
									description="@tonyreichert"
									name="Tony Reichert"
								/>
							</DropdownTrigger>
							<DropdownMenu aria-label="User Actions" variant="flat">
								<DropdownItem key="profile" className="h-14 gap-2">
									<p className="font-bold">Signed in as</p>
									<p className="font-bold">@tonyreichert</p>
								</DropdownItem>
								<DropdownItem key="settings">My Settings</DropdownItem>
								<DropdownItem key="team_settings">Team Settings</DropdownItem>
								<DropdownItem key="analytics">Analytics</DropdownItem>
								<DropdownItem key="system">System</DropdownItem>
								<DropdownItem key="configurations">Configurations</DropdownItem>
								<DropdownItem key="help_and_feedback">
									Help & Feedback
								</DropdownItem>
								<DropdownItem key="logout" color="danger">
									Log Out
								</DropdownItem>
							</DropdownMenu>
						</Dropdown> */}
		</div>
	)
}

export default AvatarDropdown
