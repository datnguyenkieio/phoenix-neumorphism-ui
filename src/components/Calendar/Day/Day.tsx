import React from 'react'
import { DayDetail } from '../../../types/type'
import { todayTimestamp } from '../../../util/const'

interface Props {
	day: DayDetail
	index: number
	selectedDay: number
	onDateClick: (day: DayDetail) => void
}

export const Day = ({ day, index, selectedDay, onDateClick }: Props) => {
	const isCurrentDay = (day: DayDetail) => {
		return day.timestamp === todayTimestamp
	}

	const isSelectedDay = (day: DayDetail) => {
		return day.timestamp === selectedDay
	}

	const handleDateclick = () => {
		onDateClick(day)
	}
	return (
		<div
			className={
				'phoenix-neumorphism-datepicker-calendar-day-container' +
				(!day.isActive ? ' disabled' : '') +
				(isCurrentDay(day) ? ' highlight' : '') +
				(isSelectedDay(day) ? ' highlight-green' : '')
			}
			key={`day-${index}`}
		>
			<div className='phoenix-neumorphism-datepicker-calendar-day-container-day'>
				<span onClick={handleDateclick}>{day.date}</span>
			</div>
		</div>
	)
}
