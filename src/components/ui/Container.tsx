import React from "react"

const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="container mx-auto max-w-7xl px-6 flex-grow mt-5">
			{children}
		</div>
	)
}

export default Container
