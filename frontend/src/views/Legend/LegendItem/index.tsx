import React from 'react'

// Components
import { InfoSign } from './InfoSign'

// Styles
import s from './index.module.css'

// Types
import { ReactNode } from 'react'

export const LegendItem = ({ children, label, labelWidth }: IProps) => {
	return (
		<div className={s.LegendItem}>
			{children}
			<div className={s.LegendItemLabel} style={{ width: labelWidth + 'px' }}>
				{label}
			</div>
			<InfoSign />
		</div>
	)
}

interface IProps {
	children: ReactNode
	label: string
	labelWidth: number
}
