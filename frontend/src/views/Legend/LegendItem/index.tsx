import React from 'react'

// Styles
import s from './index.module.css'

// Types
import { ReactNode } from 'react'

export const LegendItem = ({ children, label }: IProps) => {
	return (
		<div className={s.LegendItem}>
			{children}
			<div className={s.LegendItemLabel}>{label}</div>
		</div>
	)
}

interface IProps {
	children: ReactNode
	label: string
}
