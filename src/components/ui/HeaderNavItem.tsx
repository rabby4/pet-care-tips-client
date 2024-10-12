"use client"
import { siteConfig } from "@/src/config/site"
import { NavbarItem } from "@nextui-org/navbar"
import clsx from "clsx"
import { link as linkStyles } from "@nextui-org/theme"
import NextLink from "next/link"
import { usePathname } from "next/navigation"

const HeaderNavItem = () => {
	const pathName = usePathname()

	return (
		<>
			{siteConfig?.navItems?.map((item) => (
				<NavbarItem key={item.href} isActive={pathName === item.href}>
					<NextLink
						className={clsx(
							linkStyles({ color: "foreground" }),
							"data-[active=true]:text-primary data-[active=true]:font-medium"
						)}
						color="foreground"
						href={item.href}
					>
						{item.label}
					</NextLink>
				</NavbarItem>
			))}
		</>
	)
}

export default HeaderNavItem
