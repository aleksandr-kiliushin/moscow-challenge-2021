import React, { useState } from 'react'

// Components
import { LegendItem } from './LegendItem'

// Styles
import s from './index.module.css'

// Assets
import greenFlagSvg from '../../assets/green-flag.svg'
import schoolsUnderConstructionSvg from '../../assets/school-under-construction.svg'
import { Modal } from '#components/Modal'
import { ModalHeader } from '#components/Modal/ModalHeader'

// Types
import { ReactNode } from 'react'

export const Legend = () => {
	const [shownLegendItem, setShownLegendItem] = useState<ILegendItem | null>(null)

	return (
		<>
			<div className={s.Legend}>
				<LegendItem
					label="Локация в повышенным и неудовлетворенным спросом"
					labelWidth={240}
					setShownLegendItem={setShownLegendItem}
				>
					<div className={s.ProblemPolygonLegendIcon}>
						<div className={s.ProblemPolygon} />
						<div className={s.ProblemPolygon} />
						<div className={s.ProblemPolygon} />
					</div>
				</LegendItem>

				<LegendItem
					label="Объект в стадии строительства"
					labelWidth={130}
					setShownLegendItem={setShownLegendItem}
				>
					<img className={s.LegendIcon} src={schoolsUnderConstructionSvg} />
				</LegendItem>

				<LegendItem
					label="Рекомендуемое месторасположение"
					labelWidth={160}
					setShownLegendItem={setShownLegendItem}
				>
					<img className={s.LegendIcon} src={greenFlagSvg} />
				</LegendItem>
			</div>

			{shownLegendItem && (
				<Modal closeModal={() => setShownLegendItem(null)}>
					<ModalHeader cnModalHeader={s.ModalHeader}>
						{shownLegendItem.icon}
						{shownLegendItem.label}
					</ModalHeader>
				</Modal>
			)}
		</>
	)
}

export interface ILegendItem {
	icon: ReactNode
	label: string
}
