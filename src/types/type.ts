export declare type LiteralUnion<T extends U, U> = T | (U & {})

export interface DayDetailProps {
	index: number
	numberOfDays: number
	firstDay: number
	year: number
	month: number
}

export interface DateData {
	year: number
	month: number
	date: number
}

export interface DayDetail {
	date: number
	day: number
	month: number
	isActive: boolean
	timestamp: number
	dayString: string
}
;[]

export type MouseAndTouchEvent = MouseEvent | TouchEvent

export interface StylePosition extends React.CSSProperties {}
export type PositionType =
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
