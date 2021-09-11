import React from 'react'
import { Button, Container, Input, TextArea } from 'phoenix-neumorphism-ui'
import { DiReact } from 'react-icons/di'
import { useState } from 'react'

export const TextInput = () => {
    const [small, setSmall] = useState('')
	const [medium, setMedium] = useState('')
	const [large, setLarge] = useState('')

	const onSmallChange = (even: React.ChangeEvent<HTMLInputElement>) => {
		setSmall(even.target.value)
	}
	const onMediumChange = (even: React.ChangeEvent<HTMLInputElement>) => {
		setMedium(even.target.value)
	}
	const onLargeChange = (even: React.ChangeEvent<HTMLInputElement>) => {
		setLarge(even.target.value)
	}

	const onCick = () => {
		console.log({ small, medium, large })
	}

	return (
		<Container>
			<div
				style={{
					paddingTop: '1rem',
					width: '50%',
					height: '100vh',
					display: 'grid',
					gap: '1rem 1rem',
					gridTemplateColumns: '25rem 10rem',
					gridTemplateRows: '4rem 4rem 4rem',
					gridAutoRows: '4rem'
				}}
			>
				<Input
                    type="color"
                    placeholder="playholder"
					onChange={onSmallChange}
					value={small}
					size='small'
					prefixOutside={'nguyen'}
					prefixInside={'dat'}
					suffixInside={<DiReact />}
				/>
				<Button onClick={onCick} size='small'>
					Small
				</Button>
				<Input
                    type="month"
                    placeholder="playholder"
					onChange={onMediumChange}
					value={medium}
					size='medium'
					prefixInside={'dat'}
					suffixInside={<DiReact />}
				/>
				<Button onClick={onCick} size='medium'>
					Medium
				</Button>
				<Input
                    type="time"
                    placeholder="playholder"
					onChange={onLargeChange}
					value={large}
					size='large'
					prefixInside={'dat'}
					suffixInside={<DiReact />}
				/>
				<Button onClick={onCick} size='large'>
					Large
				</Button>
                <TextArea/>
			</div>
		</Container>
	)
}
