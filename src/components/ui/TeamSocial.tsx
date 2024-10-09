import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import React from "react"

const TeamSocial = () => {
	return (
		<div className="social-profile ">
			<ul className="flex gap-1 justify-center">
				<li>
					<Link
						href="#"
						className="flex justify-center items-center text-xl size-10 bg-white rounded-full text-gray-500 hover:text-white hover:bg-primary"
					>
						<Facebook />
					</Link>
				</li>
				<li>
					<Link
						href="#"
						className="flex justify-center items-center text-xl size-10 bg-white rounded-full text-gray-500 hover:text-white hover:bg-primary"
					>
						<Twitter />
					</Link>
				</li>
				<li>
					<Link
						href="#"
						className="flex justify-center items-center text-xl size-10 bg-white rounded-full text-gray-500 hover:text-white hover:bg-primary"
					>
						<Instagram />
					</Link>
				</li>
				<li>
					<Link
						href="#"
						className="flex justify-center items-center text-xl size-10 bg-white rounded-full text-gray-500 hover:text-white hover:bg-primary"
					>
						<Linkedin />
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default TeamSocial
