import NewsFeed from "@/src/components/modules/home/NewsFeed"
import RichForm from "@/src/components/modules/home/RichForm"

export default function Home() {
	return (
		<div className="mb-10">
			<RichForm />
			<NewsFeed searchParams={""} />
		</div>
	)
}
