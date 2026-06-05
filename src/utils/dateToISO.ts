interface IDate {
	calender: {
		identifier: string
	}
	day: number
	era: string
	month: number
	year: number
}

// returns undefined when no date was picked so callers can omit the field
const dateToISO = (date?: IDate | null) => {
	if (!date?.year) return undefined

	// build from parts; string parsing of "d-m-y" is unreliable
	return new Date(date.year, date.month - 1, date.day).toISOString()
}

export default dateToISO
