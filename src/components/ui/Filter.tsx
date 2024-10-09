import useDebounce from "@/src/hooks/bounce.hook"
import { useState } from "react"

interface FilterProps {
	setCategory: (category: string | undefined) => void
}

const Filter = ({ setCategory }: FilterProps) => {
	const [searchQuery, setSearchQuery] = useState("")
	const debouncedSearchQuery = useDebounce(searchQuery, 500)

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
	}

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value || undefined)
	}

	return (
		<div className="filter-section">
			<input
				type="text"
				placeholder="Search posts..."
				value={searchQuery}
				onChange={handleSearch}
				className="search-input"
			/>

			<select onChange={handleCategoryChange} className="category-select">
				<option value="">All Categories</option>
				<option value="tips">Tips</option>
				<option value="story">Story</option>
			</select>
		</div>
	)
}

export default Filter
