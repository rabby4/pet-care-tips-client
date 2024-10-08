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
			<div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-12 gap-5 order-1">
				<div className="md:col-span-3 col-span-12">
					<div className="sticky top-20 lg:h-screen">{leftSidebar}</div>
				</div>
				<div className="md:col-span-6 col-span-12 lg:order-2 order-3">
					{children}
				</div>
				<div className="md:col-span-3 col-span-12 lg:order-3 order-2">
					<div className="sticky top-20 lg:h-screen">{rightSidebar}</div>
				</div>
			</div>
		</Container>
	)
}

export default layout
