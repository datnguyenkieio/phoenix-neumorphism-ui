export const daysMap = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
]
export const monthMap = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]
export const oneDay = 60 * 60 * 24 * 1000

export const date = new Date()
// const oneDay = 60 * 60 * 24 * 1000
export const todayTimestamp =
	date.getTime() -
	(date.getTime() % oneDay) +
	date.getTimezoneOffset() * 1000 * 60