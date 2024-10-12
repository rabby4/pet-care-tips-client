"use client"
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const ProfileNavbar = () => {
	const pathName = usePathname()

	return (
		<>
			<Navbar
				classNames={{
					item: [
						"flex",
						"relative",
						"h-1/2",
						"items-center",
						"data-[active=true]:after:content-['']",
						"data-[active=true]:after:absolute",
						"data-[active=true]:after:bottom-0",
						"data-[active=true]:after:left-0",
						"data-[active=true]:after:right-0",
						"data-[active=true]:after:h-[2px]",
						"data-[active=true]:after:rounded-[2px]",
						"data-[active=true]:after:bg-primary",
						"data-[active=true]:text-primary",
					],
				}}
			>
				<NavbarContent className="hidden sm:flex gap-8" justify="center">
					<NavbarItem isActive={pathName === "/profile/feed"}>
						<Link color="foreground" href={"/profile/feed"}>
							My Posts
						</Link>
					</NavbarItem>
					<NavbarItem isActive={pathName === "/profile/add-post"}>
						<Link color="foreground" href={"/profile/add-post"}>
							Add Post
						</Link>
					</NavbarItem>
					<NavbarItem isActive={pathName === "/profile/edit-profile"}>
						<Link aria-current="page" href="/profile/edit-profile">
							Edit Profile
						</Link>
					</NavbarItem>
					<NavbarItem isActive={pathName === "/profile/about"}>
						<Link color="foreground" href="/profile/about">
							About
						</Link>
					</NavbarItem>
					<NavbarItem isActive={pathName === "/profile/followers"}>
						<Link color="foreground" href="/profile/followers">
							Followers
						</Link>
					</NavbarItem>
					<NavbarItem isActive={pathName === "/profile/following"}>
						<Link color="foreground" href="/profile/following">
							Following
						</Link>
					</NavbarItem>
				</NavbarContent>
			</Navbar>
		</>
	)
}

export default ProfileNavbar
