import React, { useEffect, useState, useRef, RefObject } from 'react'
import { useOnClickOutside } from '../../hook/useClickOutSide'
import { DateData, DayDetail } from '../../types/type'
import { date, monthMap, todayTimestamp } from '../../util/const'
import {
	getDateFromDateString,
	getDateStringFromTimestamp,
	getMonthDetails
} from '../../util/function'
import { Day } from './Day/Day'
import './Calendar.scss'
export interface CalendarProps
	extends Omit<
		React.HTMLProps<HTMLDivElement>,
		'size' | 'type' | 'onChange'
	> {
	onChange?: (date: string) => any
	value?: string
	onClickOutSide?: (e?: MouseEvent) => void
	datePickerRef?:RefObject<HTMLElement>
}

export const Calendar = ({
	onChange,
	value,
	onClickOutSide,
	datePickerRef
}: CalendarProps) => {
	const calendarrRef = useRef<HTMLDivElement>(null)
	const [selectedDay, setSelectedDay] = useState<number>(todayTimestamp)
	const [month, setMonth] = useState<number>(date.getMonth())
	const [year, setYear] = useState<number>(date.getFullYear())
	const [monthDetail, setMonthDetail] = useState<DayDetail[]>(
		getMonthDetails(year, month)
	)
	const clickOutSide = () => {
		if (onClickOutSide) {
			onClickOutSide()
		}
	}
	useOnClickOutside(datePickerRef?datePickerRef:calendarrRef, clickOutSide)
	useEffect(() => {
		if (value) {
			updateDateFromInput(value)
		}
	}, [value])

	const getMonthStr = (month: number) =>
		monthMap[Math.max(Math.min(11, month), 0)] || 'Month'

	const setDate = (dateData: DateData) => {
		let selectedDay = new Date(
			dateData.year,
			dateData.month - 1,
			dateData.date
		).getTime()
		setSelectedDay(selectedDay)
	}

	const updateDateFromInput = (valua: string) => {
		let dateData = getDateFromDateString(valua || '')
		if (dateData !== null) {
			setDate(dateData)
			setYear(dateData.year)
			setMonth(dateData.month - 1)
			setMonthDetail(getMonthDetails(dateData.year, dateData.month - 1))
		}
	}

	const onDateClick = (day: DayDetail) => {
		setSelectedDay(day.timestamp)
		if (onChange) {
			let dateString = getDateStringFromTimestamp(day.timestamp)
			onChange(dateString)
		}
	}

	const handleSetYear = (offset: number) => {
		setYear(year + offset)
		setMonthDetail(getMonthDetails(year + offset, month))
	}

	const handleSetMonth = (offset: number) => {
		let newMonth = month + offset
		let newYear = year
		if (newMonth === -1) {
			newMonth = 11
			newYear--
		} else if (newMonth === 12) {
			newMonth = 0
			newYear++
		}
		setMonth(newMonth)
		setYear(newYear)
		setMonthDetail(getMonthDetails(year, newMonth))
	}

	const daysMarkup = monthDetail.map((day, index) => (
		<Day
			day={day}
			key={`day-${index}`}
			index={index}
			selectedDay={selectedDay}
			onDateClick={onDateClick}
		/>
	))

	const calendarMarkup = (
		<div
			className='phoenix-neumorphism-datepicker-calendar-container'
		>
			<div className='phoenix-neumorphism-datepicker-calendar-container-head'>
				{['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(
					(d, i) => (
						<div
							key={`${d}-${i}`}
							className='phoenix-neumorphism-datepicker-calendar-container-head-name'
						>
							{d}
						</div>
					)
				)}
			</div>
			<div className='phoenix-neumorphism-datepicker-calendar-container-body'>
				{daysMarkup}
			</div>
		</div>
	)
	const onNextMonthClick = () => {
		handleSetMonth(1)
	}
	const onPreMonthClick = () => {
		handleSetMonth(-1)
	}
	const onNextYearClick = () => {
		handleSetYear(1)
	}
	const onPreYearClick = () => {
		handleSetYear(-1)
	}
	return (
		<div className='phoenix-neumorphism-datepicker-container' ref={calendarrRef}>
			<div className='phoenix-neumorphism-datepicker-container-head'>
				{/* <div className="phoenix-neumorphism-datepicker-container-head-button-group-left border-radius-left"> */}
				<div className='phoenix-neumorphism-datepicker-container-head-button'>
					<div
						className='phoenix-neumorphism-datepicker-container-head-button-inner border-radius-left'
						onClick={onPreYearClick}
					>
						<span className='phoenix-neumorphism-datepicker-container-head-button-inner-left-arrows'></span>
					</div>
				</div>
				<div className='phoenix-neumorphism-datepicker-container-head-button'>
					<div
						className='phoenix-neumorphism-datepicker-container-head-button-inner'
						onClick={onPreMonthClick}
					>
						<span className='phoenix-neumorphism-datepicker-container-head-button-inner-left-arrow'></span>
					</div>
				</div>
				{/* </div> */}
				<div className='phoenix-neumorphism-datepicker-container-head-container'>
					<div className='phoenix-neumorphism-datepicker-container-head-container-year'>
						{year}
					</div>
					<div className='phoenix-neumorphism-datepicker-container-head-container-month'>
						{getMonthStr(month)}
					</div>
				</div>
				{/* <div  className="phoenix-neumorphism-datepicker-container-head-button-group-right border-radius-right"> */}
				<div className='phoenix-neumorphism-datepicker-container-head-button'>
					<div
						className='phoenix-neumorphism-datepicker-container-head-button-inner'
						onClick={onNextMonthClick}
					>
						<span className='phoenix-neumorphism-datepicker-container-head-button-inner-right-arrow'></span>
					</div>
				</div>
				<div
					className='phoenix-neumorphism-datepicker-container-head-button'
					onClick={onNextYearClick}
				>
					<div className='phoenix-neumorphism-datepicker-container-head-button-inner border-radius-right'>
						<span className='phoenix-neumorphism-datepicker-container-head-button-inner-right-arrows'></span>
					</div>
				</div>
				{/* </div> */}
			</div>
			<div className='phoenix-neumorphism-datepicker-container-body'>
				{calendarMarkup}
			</div>
		</div>
	)
}
