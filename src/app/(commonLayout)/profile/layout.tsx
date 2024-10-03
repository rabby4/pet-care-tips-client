import Container from "@/src/components/ui/Container"

const layout = ({
	children,
	sidebar,
}: {
	children: React.ReactNode
	sidebar: React.ReactNode
}) => {
	return (
		<Container>
			<div className="relative flex flex-col h-screen">
				<div>{children}</div>
				<div>{sidebar}</div>
			</div>
		</Container>
	)
}

export default layout
