import { SVGProps } from "react"

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number
}

export type TUser = {
	_id: string
	// firstName: string
	// lastName: string
	email: string
	role: "user" | "admin"
	// premium: boolean
	// createdAt: string
	// updatedAt: string
	// __v: number
}
