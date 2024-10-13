"use client"
import { ReactNode } from "react"
import { motion } from "framer-motion"

type AnimationProps = {
	children: ReactNode
	direction?: "left" | "right" | "down" | "up"
	className?: string
}

const Animation = ({
	children,
	direction = "left",
	className,
}: AnimationProps) => {
	let initial, animate

	switch (direction) {
		case "right":
			initial = { opacity: 0, x: 50 }
			animate = { opacity: 1, x: 0 }
			break
		case "down":
			initial = { opacity: 0, y: -50 }
			animate = { opacity: 1, y: 0 }
			break
		case "up":
			initial = { opacity: 0, y: 50 }
			animate = { opacity: 1, y: 0 }
			break
		case "left":
		default:
			initial = { opacity: 0, x: -50 }
			animate = { opacity: 1, x: 0 }
			break
	}

	return (
		<motion.div
			animate={animate}
			className={className}
			initial={initial}
			transition={{ duration: 1 }}
		>
			{children}
		</motion.div>
	)
}

export default Animation
