import { SVGProps } from "react"

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number
}

export type TUser = {
	_id: string
	firstName: string
	lastName: string
	email: string
	role: "superAdmin" | "user" | "admin"
	premium: boolean
	createdAt: string
	updatedAt: string
	image: string
	__v: number
}

export type TPost = {
	_id: string
	content: string
	image: string
	user: TUser
	premium: boolean
	createdAt: string
	updatedAt: string
}
