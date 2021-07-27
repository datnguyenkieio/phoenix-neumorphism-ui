import React from 'react'
import "./Container.scss"
import classnames from 'classnames'
export interface ContainerProps {
	children?: React.ReactNode
	className?: string
	justifyContent?: "center"|"flex-end"|"flex-start"|"space-around"|"space-between"|"space-evenly";
    alignItems?: "center"|"flex-end"|"flex-start";
}

export const Container = ({ children, className, alignItems,justifyContent }: ContainerProps) => {
	return (
			<div className={classnames(
					'phoenix-neumorphism-container',justifyContent,alignItems,
					className
				)}
			>
				{children}
			</div>
	)
}
