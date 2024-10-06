interface IDate {
	calender: {
		identifier: string
	}
	day: number
	era: string
	month: number
	year: number
}

const dateToISO = (date: IDate) => {
	if (!date) return new Date().toISOString()

	return new Date(`${date?.day}-${date?.month}-${date?.year}`).toISOString()
}

export default dateToISO
