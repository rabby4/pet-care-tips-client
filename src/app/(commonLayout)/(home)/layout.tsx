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
			<div className="grid grid-cols-12 gap-5">
				<div className="col-span-3">{leftSidebar}</div>
				<div className="col-span-6">{children}</div>
				<div className="col-span-3">{rightSidebar}</div>
			</div>
		</Container>
	)
}

export default layout
