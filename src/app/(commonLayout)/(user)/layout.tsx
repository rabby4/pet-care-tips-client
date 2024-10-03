import Sidebar from "@/src/components/modules/profile/Sidebar"
import Container from "@/src/components/ui/Container"

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Container>
			<div className="grid grid-cols-12 gap-5">
				<div className="col-span-8 flex flex-col gap-5">
					<Sidebar />
					{children}
				</div>
				<div className="col-span-4">
					<div className="sticky top-20 h-screen">
						<h1>this is right sidebar</h1>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default layout
