import React from 'react'

// Styles
import s from './index.module.css'

// Types
import { ReactNode } from 'react'
import { ILegendItem } from '#views/Legend'

export const InfoSign = ({ icon, label, setShownLegendItem }: IProps) => {
	return (
		<div
			className={s.InfoSign}
			onClick={() => {
				setShownLegendItem({ icon, label })
			}}
		>
			i
		</div>
	)
}

interface IProps {
	icon: ReactNode
	label: string
	setShownLegendItem: (item: ILegendItem) => void
}
