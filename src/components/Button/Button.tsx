import classNames from 'classnames'
import React, { ReactNode } from 'react'
import { Shape, Size } from '../../util/enum'
import './Button.scss'
interface ButtonIconProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode
	shape?: 'square' | 'rounded'
	size?: 'small' | 'medium' | 'large'
	className?: string
}

export const ButtonIcon = ({
	children,
	shape = Shape.SQUARE,
	size = Size.MEDIUM,
	className,
	...props
}: ButtonIconProps) => {
	return (
		<button
			{...props}
			className={classNames('phoenix-neumorphism-button','phoenix-neumorphism-button-icon-only', {
				'phoenix-neumorphism-button-rounded': shape === Shape.ROUNDED,
				[`phoenix-neumorphism-button-${size}`]: size
			})}
		>
			<div
				className={classNames(
					'phoenix-neumorphism-button-content',
					className
				)}
			>
				{children && (
					<span className={`phoenix-neumorphism-button-text`}>
						{children}
					</span>
				)}
			</div>
		</button>
	)
}

interface ButtonProps extends ButtonIconProps {
	prefixIcon?: ReactNode
	suffixIcon?: ReactNode
}

export const Button = ({
	children,
	prefixIcon,
	suffixIcon,
	size = Size.MEDIUM,
	...props
}: ButtonProps) => {
	return (
		<button
			{...props}
			className={classNames('phoenix-neumorphism-button', {
				[`phoenix-neumorphism-button-${size}`]: size
			})}
		>
			<div className='phoenix-neumorphism-button-content'>
				{prefixIcon && (
					<span className='phoenix-neumorphism-button-prefix-icon'>
						{prefixIcon}
					</span>
				)}
				{children && (
					<span
						className={`phoenix-neumorphism-button-text ${
							prefixIcon && 'margin-left'
						} ${suffixIcon && 'margin-right'}`}
					>
						{children}
					</span>
				)}
				{suffixIcon && (
					<span className='phoenix-neumorphism-button-suffix-icon'>
						{suffixIcon}
					</span>
				)}
			</div>
		</button>
	)
}
