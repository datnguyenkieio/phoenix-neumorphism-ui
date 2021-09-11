import React, { useEffect, useState, useRef, createRef } from 'react'
import { todayTimestamp } from '../../util/const'
import {
	// getDateFromDateString,
	getDateStringFromTimestamp, getPosition
} from '../../util/function'
import './DatePicker.scss'

import { Input, InputProps } from '../Input/Input'
import { Calendar } from '../Calendar/Calendar'
import classNames from 'classnames'
import { StylePosition } from '../../types/type'
export interface DatePickerProps extends Omit<InputProps, 'onChange' | 'type'> {
	onChange?: (date: string) => any
	position?:
		| 'top'
		| 'top-left'
		| 'top-right'
		| 'bottom'
		| 'bottom-left'
		| 'bottom-right'
		| 'left'
		| 'left-top'
		| 'left-bottom'
		| 'right'
		| 'right-top'		
		| 'right-bottom'
}

export const DatePicker = ({
	onChange,
	onClick,
	position = 'bottom'
}: DatePickerProps) => {
	const datePickerRef = useRef<HTMLDivElement>(null)
	const inputRef = createRef<HTMLInputElement>()
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>('')
	const [stylePosition, setStylePosition] = useState<StylePosition>()
	// const [boundingClientRect, setBoundingClientRect] = useState<DOMRect>()

	useEffect(() => {
		let dateString = getDateStringFromTimestamp(todayTimestamp)
		setInputValue(dateString)
	}, [])

	useEffect(() => {
		const element = inputRef.current?.getBoundingClientRect()
		if (inputRef && element) {
			setStylePosition(getPosition(position,element,10))
		}
	}, [showDatePicker])

	const onInputClick = (even: React.MouseEvent<HTMLInputElement>) => {
		const element = datePickerRef.current?.getBoundingClientRect()
		console.log(element)
		console.log('innerHeight:', window.innerHeight)
		console.log('innerWidth:', window.innerWidth)
		if (element) {
			console.log({
				height: element.bottom + element.height + 360,
				width: element.right - element.width + 320,
				isBottom: element.bottom + 360 < window.innerHeight,
				isRight: element.right - element.width + 320 < window.innerWidth
			})
		}
		setShowDatePicker(true)
		if (onClick) {
			onClick(even)
		}
	}

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const onCalendarClick = (value: string) => {
		setInputValue(value)
		if (onChange) {
			onChange(value)
		}
	}

	const onClickOutSide = () => {
		setShowDatePicker(false)
	}

	return (
		<div
			className='phoenix-neumorphism-datepicker-warpper'
			ref={datePickerRef}
		>
			<Input
				onClick={onInputClick}
				type='date'
				value={inputValue}
				onChange={onInputChange}
				ref={inputRef}
			/>

			{showDatePicker ? (
				<div
					className={classNames(
						'phoenix-neumorphism-datepicker-calendar-position',
						{
							[`phoenix-neumorphism-datepicker-calendar-position-${position}`]:
								position
						}
					)}
					style={stylePosition}
				>
					<Calendar
						datePickerRef={datePickerRef}
						value={inputValue}
						onChange={onCalendarClick}
						onClickOutSide={onClickOutSide}
					/>
				</div>
			) : (
				''
			)}
		</div>
	)
}
