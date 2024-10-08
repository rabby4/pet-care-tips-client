import LeftSidebar from "@/src/components/modules/admin/LeftSidebar"
import Container from "@/src/components/ui/Container"
import React, { ReactNode } from "react"

const AdminLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Container>
			<div className="grid grid-cols-12 gap-5">
				<div className="col-span-3">
					<div className="sticky top-20 h-screen">
						<LeftSidebar />
					</div>
				</div>
				<div className="col-span-9">{children}</div>
			</div>
		</Container>
	)
}

export default AdminLayout
