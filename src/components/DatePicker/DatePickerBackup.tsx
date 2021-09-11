import React, { createRef, useEffect, useRef, useState } from 'react'
import { DateData, DayDetail } from '../../types/type'
import { date, monthMap, todayTimestamp } from '../../util/const'
import {
	getDateStringFromTimestamp,
	getMonthDetails
} from '../../util/function'
import './DatePicker.scss'
import { Day } from '../Calendar/Day/Day'

import { Input, InputProps } from '../Input/Input'
export interface DatePickerBackupProps extends Omit<InputProps,"onChange"|"type">{
	onChange?: (date: number) => any
}


export const DatePickerBackup = ({ onChange,onClick}: DatePickerBackupProps) => {
	const datePickerRef = useRef<HTMLDivElement>(null)
	const inputRef = createRef<HTMLInputElement>()
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
	const [selectedDay, setSelectedDay] = useState<number>(todayTimestamp)
	const [month, setMonth] = useState<number>(date.getMonth())
	const [year, setYear] = useState<number>(date.getFullYear())
	const [monthDetail, setMonthDetail] = useState<DayDetail[]>(getMonthDetails(year, month))
	const setDateToInput = (timestamp: number) => {
		let dateString = getDateStringFromTimestamp(timestamp)
		if (inputRef) {
			if (inputRef.current) {
				inputRef.current.value = dateString
			}
		}
	}

	const addBackDrop = (e: MouseEvent) => {
		if (
			showDatePicker &&
			datePickerRef &&
			!datePickerRef.current?.contains(e.target as Node)
		) {
			setShowDatePicker(false)
		}
	}



	const getDateFromDateString = (dateValue: string): DateData | null => {
		let dateData = dateValue.split('-').map((d) => parseInt(d, 10))
		if (dateData.length < 3) return null

		let year = dateData[0]
		let month = dateData[1]
		let date = dateData[2]
		return { year, month, date }
	}

	const getMonthStr = (month: number) =>
		monthMap[Math.max(Math.min(11, month), 0)] || 'Month'

	const setDate = (dateData: DateData) => {
		let selectedDay = new Date(
			dateData.year,
			dateData.month - 1,
			dateData.date
		).getTime()
		setSelectedDay(selectedDay)
		if (onChange) {
			onChange(selectedDay)
		}
	}

	const updateDateFromInput = () => {
		let dateValue = inputRef?.current?.value
		let dateData = getDateFromDateString(dateValue || '')
		if (dateData !== null) {
			setDate(dateData)
			setYear(dateData.year)
			setMonth(dateData.month - 1)
			setMonthDetail(getMonthDetails(dateData.year, dateData.month - 1))
		}
	}

	const onDateClick = (day: any) => {
		setSelectedDay(day.timestamp)
		setDateToInput(day.timestamp)
		if (onChange) {
			onChange(day.timestamp)
		}
	}

	const handleSetYear = (offset: number ) => {
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
	useEffect(() => {
		window.addEventListener('click', addBackDrop)
		setDateToInput(selectedDay)
		// returned function will be called on component unmount
		return () => {
			window.removeEventListener('click', addBackDrop)
		}
	}, [showDatePicker])

	const onInputClick = (even:React.MouseEvent<HTMLInputElement>) => {
		setShowDatePicker(true)
		if(onClick){
			onClick(even)
		}
	}


	const daysMarkup = monthDetail.map((day, index) => (
		<Day day={day} index={index} selectedDay={selectedDay} onDateClick={onDateClick} />
	))

	const calendarMarkup = (
		<div className='phoenix-neumorphism-datepicker-calendar-container'>
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
		<div className='phoenix-neumorphism-datepicker-warpper' ref={datePickerRef}>
			{/* <Input onClick={onInputClick} type="date" onChange={updateDateFromInput}/> */}
			<Input onClick={onInputClick} type="date" onChange={updateDateFromInput} ref={inputRef}/>
			{/* <div
				className='phoenix-neumorphism-datepicker-input'
				onClick={onInputClick}
			>
				<input
					type='date'
					onChange={updateDateFromInput}
					ref={inputRef}
				/>
			</div> */}
			{showDatePicker ? (
				<div className='phoenix-neumorphism-datepicker-container'>
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
			) : (
				''
			)}
		</div>
	)
}
