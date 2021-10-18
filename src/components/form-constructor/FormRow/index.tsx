import React, { ReactNode } from 'react'

// Styles
import s from './index.module.css'

export const FormRow = ({ children, label = '' }: IProps) => {
	return (
		<div className={s.FormRow}>
			<div className={s.Label}>{label}</div>

			{children}
		</div>
	)
}

interface IProps {
	children: ReactNode
	label?: ReactNode
}
