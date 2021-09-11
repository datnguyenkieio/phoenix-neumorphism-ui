import { DateData, DayDetailProps, PositionType, StylePosition } from '../types/type'
import { daysMap } from './const'
import { ThemeVariables } from './theme'
import { Position } from './enum'

export const setCSSVariable = (
	element: HTMLElement | null,
	variable: string,
	value: string
) => {
	if (element && value) {
		element.style.setProperty(variable, String(value))
	}
}

export const overrideThemeVariables = (themeObject: ThemeVariables) => {
	const root = document.getElementById('root')
	const themeVariables = Object.keys(themeObject)
	if (root && themeObject) {
		themeVariables.forEach((themeVar) => {
			const varValue = themeObject[themeVar]
			if (varValue && themeVar.startsWith('--')) {
				setCSSVariable(root, themeVar, varValue)
			}
		})
	}
}

export const getMonthDetails = (year: number, month: number) => {
	let firstDay = new Date(year, month).getDay()
	let numberOfDays = getNumberOfDays(year, month)
	let monthArray = []
	let rows = 5
	let currentDay = null
	let index = 0
	let cols = 7

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			currentDay = getDayDetails({
				index,
				numberOfDays,
				firstDay,
				year,
				month
			})
			monthArray.push(currentDay)
			index++
		}
	}
	return monthArray
}

export const getDayDetails = (args: DayDetailProps) => {
	let date = args.index - args.firstDay
	let day = args.index % 7
	let prevMonth = args.month - 1
	let prevYear = args.year
	if (prevMonth < 0) {
		prevMonth = 11
		prevYear--
	}
	let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth)
	let _date =
		(date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1
	let monthOffset = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0
	let newMonth = args.month + monthOffset
	let timestamp = new Date(args.year, newMonth, _date).getTime()
	return {
		date: _date,
		day,
		month: newMonth,
		isActive: monthOffset === 0,
		timestamp,
		dayString: daysMap[day]
	}
}

export const getNumberOfDays = (year: number, month: number) => {
	return 40 - new Date(year, month, 40).getDate()
}

export const getDateStringFromTimestamp = (timestamp: number) => {
	let dateObject = new Date(timestamp)
	let month = dateObject.getMonth() + 1
	let date = dateObject.getDate()
	return (
		dateObject.getFullYear() +
		'-' +
		(month < 10 ? '0' + month : month) +
		'-' +
		(date < 10 ? '0' + date : date)
	)
}

export const getDateFromDateString = (dateValue: string): DateData | null => {
	let dateData = dateValue.split('-').map((d) => parseInt(d, 10))
	if (dateData.length < 3) return null

	let year = dateData[0]
	let month = dateData[1]
	let date = dateData[2]
	return { year, month, date }
}

export const checkPosition = () =>{

}

export const getPosition = (
	position: PositionType,
	element: DOMRect,
	offSet: number
): StylePosition => {
	switch (position) {
		case Position.TOP:
			return {
				top: 0,
				left: 0,
				transform: `translateY(calc(-100% - ${offSet}px)) translateX(calc(-50% + ${element.width/2}px)) `
			}
		case Position.TOP_LEFT:
			return {
				top: 0,
				right: 0,
				transform: `translateY(calc(-100% - ${offSet}px))`
			}
		case Position.TOP_RIGHT:
			return {
				top: 0,
				left: 0,
				transform: `translateY(calc(-100% - ${offSet}px))`
			}
		case Position.BOTTOM:
			return {
				top: element.height + offSet,
				left: 0,
				transform: `translateX(calc(-50% + ${element.width/2}px))`
			}
		case Position.BOTTOM_LEFT:
			return {
				top: element.height + offSet,
				right: 0
			}
		case Position.BOTTOM_RIGHT:
			return {
				top: element.height + offSet,
				left: 0
			}
		case Position.RIGHT:
			return {
				top: 0,
				left: element.width + offSet,
				transform: `translateY(calc(-50% + ${element.height/2}px))`
			}
		case Position.RIGHT_TOP:
			return {
				top: 0,
				left: element.width + offSet,
				transform: `translateY(calc(-100% + ${element.height}px))`
			}
		case Position.RIGHT_BOTTOM:
			return {
				top: 0,
				left: element.width + offSet,
		}
		case Position.LEFT:
			return {
				top: 0,
				left: 0,
				transform: `translateX(calc(-100% - ${offSet}px)) translateY(calc(-50% + ${element.height/2}px))`
			}
		case Position.LEFT_TOP:
			return {
				top: 0,
				left: 0,
				transform: `translateX(calc(-100% - ${offSet}px)) translateY(calc(-100% + ${element.height}px))`
			}
		case Position.LEFT_BOTTOM:
			return {
				top: 0,
				left: 0,
				transform: `translateX(calc(-100% - ${offSet}px))`
			}
		default:
			return {}
	}
}
