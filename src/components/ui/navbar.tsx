import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar"
import { Button } from "@nextui-org/button"
import { Link } from "@nextui-org/link"
import { Input } from "@nextui-org/input"
import NextLink from "next/link"
import { siteConfig } from "@/src/config/site"
import { SearchIcon } from "@/src/components/icons"
import { ThemeSwitch } from "./theme-switch"
import AvatarDropdown from "./AvatarDropdown"
import Image from "next/image"
import Search from "./Search"
import HeaderNavItem from "./HeaderNavItem"
import { getCurrentUser } from "@/src/services/authServices"

export const Navbar = async () => {
	const user = await getCurrentUser()

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Image
							alt="site logo"
							className="w-28"
							height={0}
							src={
								"https://www.radiustheme.com/demo/wordpress/themes/cirkle/wp-content/uploads/2021/11/dark_logo.svg"
							}
							width={200}
						/>
					</NextLink>
				</NavbarBrand>
				<NavbarItem className="hidden lg:flex">
					<Search />
				</NavbarItem>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<ul className="hidden md:flex gap-4 justify-start ml-2">
					<HeaderNavItem />
				</ul>
				<NavbarItem className="hidden sm:flex gap-2">
					<ThemeSwitch />
					{user ? (
						<AvatarDropdown user={user} />
					) : (
						<Button
							as={Link}
							className="text-sm font-normal rounded-md px-10"
							color="primary"
							href={`/login`}
						>
							Login
						</Button>
					)}
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				<Input
					aria-label="Search"
					classNames={{
						inputWrapper: "bg-default-100",
						input: "text-sm",
					}}
					labelPlacement="outside"
					placeholder="Search..."
					startContent={
						<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
					}
					type="search"
				/>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig?.navMenuItems?.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig?.navMenuItems?.length - 1
											? "danger"
											: "foreground"
								}
								href="#"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	)
}
