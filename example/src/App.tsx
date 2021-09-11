import React from 'react'
import 'antd/dist/antd.css';
import 'phoenix-neumorphism-ui/dist/index.css'
// import { useState } from 'react'
// import { DiReact } from 'react-icons/di'
// import { useState } from 'react'
// import { DiReact } from 'react-icons/di';
import { Container, DatePicker } from 'phoenix-neumorphism-ui';
// import { DatePicker as Antd } from 'antd';

const App = () => {
	return (
		<Container>
			<div
				style={{
					padding: '20rem 5rem',
					width: '50%',
					display: 'grid',
					gap: '1rem 1rem',
					gridTemplateColumns: '15rem 15rem 15rem',
					gridTemplateRows: '4rem 4rem 4rem',
					gridAutoRows: '4rem'
				}}
			>
				<DatePicker position="bottom" />
				<DatePicker position="bottom-left" />
				<DatePicker position="bottom-right" />
				<DatePicker position="top" />
				<DatePicker position="top-left" />
				<DatePicker position="top-right"/>
				<DatePicker position="left" />
				<DatePicker position="left-bottom" />
				<DatePicker position="left-top" />
				<DatePicker position="right" />
				<DatePicker position="right-bottom" />
				<DatePicker position="right-top" />
			</div>
		</Container>
	)
}

export default App
