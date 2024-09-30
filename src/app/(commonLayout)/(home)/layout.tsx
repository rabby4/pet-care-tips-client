import Container from "@/src/components/ui/Container"
import { ReactNode } from "react"

const layout = ({
	children,
	leftSidebar,
	rightSidebar,
}: {
	children: ReactNode
	leftSidebar: ReactNode
	rightSidebar: ReactNode
}) => {
	return (
		<Container>
			<div className="flex">
				{leftSidebar}
				{children}
				{rightSidebar}
			</div>
		</Container>
	)
}

export default layout
