import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar"
import Link from "next/link"
import React from "react"

const ProfileNavbar = () => {
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
					<NavbarItem>
						<Link color="foreground" href={"/profile/feed"}>
							My Feed
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link color="foreground" href={"/profile/add-post"}>
							Add Post
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link aria-current="page" href="/profile/edit-profile">
							Edit Profile
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link color="foreground" href="/profile/about">
							About
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link color="foreground" href="#">
							Followers
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link color="foreground" href="#">
							Following
						</Link>
					</NavbarItem>
				</NavbarContent>
			</Navbar>
		</>
	)
}

export default ProfileNavbar
