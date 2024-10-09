import { SVGProps } from "react"

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number
}

export type TUser = {
	_id: string
	firstName: string
	lastName: string
	email: string
	phone: string
	address: string
	occupation: string
	about: string
	image: string
	role: "superAdmin" | "admin" | "user"
	premium: boolean
	__v: number
	createdAt: string
	updatedAt: string
}

export type TPost = {
	_id: string
	content: string
	image: string
	user: TUser
	premium: boolean
	createdAt: string
	updatedAt: string
	upvoteCount: number
	publish: boolean
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
	user: TUser
}
