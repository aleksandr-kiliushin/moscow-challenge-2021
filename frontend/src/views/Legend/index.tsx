import React, { useState } from 'react'

// Components
import { LegendItem } from './LegendItem'

// Styles
import s from './index.module.css'

// Assets
import greenFlagSvg from '../../assets/green-flag.svg'
import objectUnderConstructionSvg from '../../assets/school-under-construction.svg'
import { Modal } from '#components/Modal'
import { ModalHeader } from '#components/Modal/ModalHeader'

// Types
import { ReactNode } from 'react'

export const Legend = () => {
	const [shownLegendItem, setShownLegendItem] = useState<ILegendItem | null>(null)

	const problemPolygonDescription = <div>hehe</div>
	const objectUnderConstructionDescription = <div>hehe</div>
	const suggestedOfficesToBuyDescription = <div>hehe</div>

	return (
		<>
			<div className={s.Legend}>
				<LegendItem
					description={problemPolygonDescription}
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
					description={objectUnderConstructionDescription}
					label="Объект в стадии строительства"
					labelWidth={130}
					setShownLegendItem={setShownLegendItem}
				>
					<img className={s.LegendIcon} src={objectUnderConstructionSvg} />
				</LegendItem>

				<LegendItem
					description={suggestedOfficesToBuyDescription}
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

					{shownLegendItem.description}
				</Modal>
			)}
		</>
	)
}

export interface ILegendItem {
	description: ReactNode
	icon: ReactNode
	label: string
}
