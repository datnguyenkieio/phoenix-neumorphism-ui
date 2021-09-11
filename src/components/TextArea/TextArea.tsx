import React from 'react'
import classNames from 'classnames'
import './TextArea.scss'
interface TextAreaProps
	extends React.InputHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = ({ ...props }: TextAreaProps) => {
	return (
		<div className={classNames("phoenix-neumorphism-textarea-warpper")}>
			<textarea className={classNames("phoenix-neumorphism-textarea")} {...props} />
		</div>
	)
}
