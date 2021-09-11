import React, { useState } from 'react'
import classNames from 'classnames'
import './Input.scss'
import { Size } from '../../util/enum'
import classnames from 'classnames'
import { LiteralUnion } from '../../types/type'
export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'|'type'> {
	type?: LiteralUnion<
		| 'email'
		| 'number'
		| 'password'
		| 'tel'
		| 'text'
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'month'
		| 'time'
		| 'url',
		string
	>
	prefixInside?: React.ReactNode
	suffixInside?: React.ReactNode
	prefixOutside?: React.ReactNode
	suffixOutside?: React.ReactNode
	size?: 'small' | 'medium' | 'large'
}

export const Input = React.forwardRef<HTMLDivElement,InputProps>(({
	onFocus,
	onBlur,
	size = Size.MEDIUM,
	suffixInside,
	prefixInside,
	prefixOutside,
	suffixOutside,
	type,
	...props
}: InputProps,ref) => {
	const [isFocus, setIsFocus] = useState<Boolean>(false)

	const onCustomFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		onFocus && onFocus(event)
		setIsFocus(true)
	}

	const onCustomBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		onBlur && onBlur(event)
		setIsFocus(false)
	}
	return (
		<div
			ref={ref}
			className={classNames('phoenix-neumorphism-input-outside-warpper', {
				[`phoenix-neumorphism-input-${size}`]: size
			})}
		>
			{prefixOutside && (
				<span
					className={classNames(
						'phoenix-neumorphism-input-prefix-outside'
					)}
				>
					{prefixOutside}
				</span>
			)}
			<div
				className={classNames(
					'phoenix-neumorphism-input-inside-warpper',
					{
						'phoenix-neumorphism-input-focus': isFocus,
						'border-radius-left': !prefixOutside,
						'border-radius-right': !suffixOutside
					}
				)}
			>
				{prefixInside && (
					<span
						className={classnames(
							'phoenix-neumorphism-input-prefix-inside'
						)}
					>
						{prefixInside}
					</span>
				)}
				<input
					{...props}
					type={type}
					className={classNames('phoenix-neumorphism-input', {
						'margin-left': prefixInside,
						'margin-right': suffixInside
					})}
					onFocus={onCustomFocus}
					onBlur={onCustomBlur}
				/>
				{suffixInside && (
					<span className='phoenix-neumorphism-input-suffix-inside'>
						{suffixInside}
					</span>
				)}
			</div>
			{suffixOutside && (
				<div
					className={classNames(
						'phoenix-neumorphism-input-suffix-outside'
					)}
				>
					{suffixOutside}
				</div>
			)}
		</div>
	)
})
