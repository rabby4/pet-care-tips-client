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
	coverImage?: string
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
	downvoteCount: number
	commentCount: number
	userVote: "up" | "down" | null
	publish: boolean
	category: string
	isRedacted?: boolean
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
	commentCount: number
	userVote?: "up" | "down" | null
	userId: string | null
	user: TUser
}

export type TPayment = {
	_id: string
	userId: string
	trxId: string
	email: string
	amount: number
	__v: number
}
