"use client"
import useDebounce from "@/src/hooks/bounce.hook"
import { useSearchItems } from "@/src/hooks/post.hook"
import { TPost } from "@/src/types"
import { Input } from "@nextui-org/input"
import { SearchIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

const Search = () => {
	const { register, handleSubmit, watch } = useForm({})
	const { mutate: handleSearch, data, isPending, isSuccess } = useSearchItems()
	const [searchResults, setSearchResults] = useState([])
	const router = useRouter()
	console.log(data)

	const searchTerm = useDebounce(watch("search"))

	useEffect(() => {
		if (searchTerm) {
			handleSearch(searchTerm)
		}
	}, [searchTerm])

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		handleSeeAll(data.search)
	}

	const handleSeeAll = (query: string) => {
		const queryString = query.trim().split(" ").join("+")

		router.push(`/posts?search=${queryString}`)
	}

	useEffect(() => {
		if (!searchTerm) {
			setSearchResults([])
		}
		if (!isPending && isSuccess && data && searchTerm) {
			setSearchResults(data?.data ?? [])
		}
	}, [isPending, isSuccess, data, searchTerm])

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register("search")}
					aria-label="Search"
					classNames={{
						inputWrapper: "bg-default-100",
						input: "text-sm",
					}}
					labelPlacement="outside"
					placeholder="Search..."
					startContent={
						<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
					}
					type="search"
				/>
			</form>
			{searchResults.length > 0 && (
				<div className="mt-80 rounded-xl bg-default-100 p-3">
					<div className="space-y-3">
						{searchResults.map((item: TPost) => (
							<Link
								key={item._id}
								className="text-default-900 block rounded-md from-default-200 p-2 transition-all hover:bg-gradient-to-l"
								href={`/posts/${item._id}`}
							>
								<div>
									<div className="flex items-center gap-2">
										<img
											alt="item"
											className="h-20 w-20 rounded-md"
											src={item.image}
										/>
										<div>
											<p className="mt-1 line-clamp-2 h-12 w-full text-sm">
												{item.content}
											</p>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
					<div className="mt-3 flex justify-center border-t-1 border-default-50 pt-3">
						<button
							className="flex items-center justify-center gap-1"
							onClick={() => handleSeeAll(searchTerm)}
						>
							<span>See All</span>
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Search
