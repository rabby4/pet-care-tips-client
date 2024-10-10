interface FilterProps {
	setCategory: (category: string | undefined) => void
}

const Filter = ({ setCategory }: FilterProps) => {
	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value || undefined)
	}

	return (
		<div className="filter-section">
			<form>
				<select onChange={handleCategoryChange} className="category-select">
					<option value="">All Categories</option>
					<option value="tips">Tips</option>
					<option value="story">Story</option>
				</select>
			</form>
		</div>
	)
}

export default Filter
