import React from 'react'

// Components
import { InfoSign } from './InfoSign'

// Styles
import s from './index.module.css'

// Types
import { ReactNode } from 'react'
import { ILegendItem } from '..'

export const LegendItem = ({ children, label, labelWidth, setShownLegendItem }: IProps) => {
	return (
		<div className={s.LegendItem}>
			{children}

			<div className={s.LegendItemLabel} style={{ width: labelWidth + 'px' }}>
				{label}
			</div>

			<InfoSign icon={children} label={label} setShownLegendItem={setShownLegendItem} />
		</div>
	)
}

interface IProps {
	children: ReactNode
	label: string
	labelWidth: number
	setShownLegendItem: (item: ILegendItem) => void
}
