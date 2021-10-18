import React from 'react'
import cx from 'classnames'

// Styles
import s from './index.module.css'

// Types
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, SyntheticEvent } from 'react'

export const Button = ({ children, color = 'primary', onClick = () => {} }: IProps) => {
	const cxButton = cx({
		[s.Button]: true,
		[s.ButtonPrimary]: color === 'primary',
		[s.ButtonRed]: color === 'red',
		[s.ButtonLight]: color === 'light',
	})

	return (
		<button className={cxButton} onClick={onClick}>
			{children}
		</button>
	)
}

type IProps = {
	color?: 'light' | 'primary' | 'red'
	children: ReactNode
	onClick?: (e?: SyntheticEvent) => void
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
