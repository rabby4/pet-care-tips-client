import { Spinner } from "@nextui-org/spinner"

// Shown immediately in the content area while a route's server components
// render, so navigation gives instant feedback (the navbar stays in place).
const Loading = () => {
	return (
		<div className="flex justify-center items-center min-h-[70vh]">
			<Spinner size="lg" />
		</div>
	)
}

export default Loading
