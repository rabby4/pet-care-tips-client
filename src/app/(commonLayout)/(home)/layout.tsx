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
				<div className="col-span-3">
					<div className="sticky top-20 h-screen">{leftSidebar}</div>
				</div>
				<div className="col-span-6 ">{children}</div>
				<div className="col-span-3">
					<div className="sticky top-20 h-screen">{rightSidebar}</div>
				</div>
			</div>
		</Container>
	)
}

export default layout
