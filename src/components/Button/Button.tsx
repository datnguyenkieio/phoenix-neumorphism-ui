import classNames from 'classnames'
import React, { ReactNode } from 'react'
import './Button.scss'

enum Shape {
	SQUARE = 'square',
	ROUNDED = 'rounded'
}

enum Size {
	SMALL = 'small',
	MEDIUM = 'medium',
	LARGE = 'large'
}

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
	startIcon?: ReactNode
	endIcon?: ReactNode
}

export const Button = ({
	children,
	startIcon,
	endIcon,
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
				{startIcon && (
					<span className='phoenix-neumorphism-button-start-icon'>
						{startIcon}
					</span>
				)}
				{children && (
					<span
						className={`phoenix-neumorphism-button-text ${
							startIcon && 'margin-left'
						} ${endIcon && 'margin-right'}`}
					>
						{children}
					</span>
				)}
				{endIcon && (
					<span className='phoenix-neumorphism-button-end-icon'>
						{endIcon}
					</span>
				)}
			</div>
		</button>
	)
}
