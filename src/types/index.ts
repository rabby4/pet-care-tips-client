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

export type TComment = {
	_id: string
	user: TUser
	content: string
	post: string
}

export type PostActionsProps = {
	id: string
	upVotes: number
	downVote: number
	userId: string | null
	comments: TComment[]
}
