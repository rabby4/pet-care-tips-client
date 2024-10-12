import NewsFeed from "@/src/components/modules/home/NewsFeed"
import RichForm from "@/src/components/modules/home/RichForm"
import Loading from "@/src/components/ui/Loading"
import { Suspense } from "react"

export default async function Home() {
	return (
		<div className="mb-10">
			<RichForm />
			<Suspense fallback={<Loading />}>
				<NewsFeed searchParams={""} />
			</Suspense>
		</div>
	)
}
