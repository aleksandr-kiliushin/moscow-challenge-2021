import React, { useState } from 'react'

// Components
import { Modal } from '#components/Modal'
import { ModalHeader } from '#components/Modal/ModalHeader'
import { LegendItem } from './LegendItem'

// Styles
import s from './index.module.css'

// Assets
import greenFlagSvg from '../../assets/green-flag.svg'
import objectUnderConstructionSvg from '../../assets/school-under-construction.svg'

// Types
import { ReactNode } from 'react'

export const Legend = () => {
	const [shownLegendItem, setShownLegendItem] = useState<ILegendItem | null>(null)

	const problemPolygonDescription = (
		<div>
			<p>
				Локации красного цвета обозначают зоны, в которых люди вынуждены ходить в соседние локации
				для посещения школ, МЦФ или других объектов социальной инфраструктуры (в зависимости от
				выбранного слоя).
			</p>
			<br />
			<p>
				Причинами необходимости может быть отсутствие или перегруженность объектов социальной
				инфраструктуры вблизи места жительства граждан.
			</p>
		</div>
	)

	const objectUnderConstructionDescription = (
		<div>
			<p>
				Объекты социальной инфраструктуры, находящиеся в реестре объектов капитального
				строительства.
			</p>
		</div>
	)

	const suggestedOfficesToBuyDescription = (
		<div>
			<p>
				Список имущества (здания, сооружения, земли), которое можно использовать для строительства,
				сдачи в аренду и т. д. – размещения объекта инфраструктуры
			</p>
		</div>
	)

	return (
		<>
			<div className={s.Legend}>
				<LegendItem
					description={problemPolygonDescription}
					label="Локация с повышенным и неудовлетворенным спросом"
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
