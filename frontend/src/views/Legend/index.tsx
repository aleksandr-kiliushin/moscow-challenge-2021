import React from 'react'

// Components
import { LegendItem } from './LegendItem'

// Styles
import s from './index.module.css'

// Assets
import greenFlagSvg from '../../assets/green-flag.svg'
import schoolsUnderConstructionSvg from '../../assets/school-under-construction.svg'

export const Legend = () => {
	return (
		<div className={s.Legend}>
			<LegendItem label="Локация в повышенным и неудовлетворенным спросом">
				<div className={s.ProblemPolygonLegendIcon}>
					<div className={s.ProblemPolygon} />
					<div className={s.ProblemPolygon} />
					<div className={s.ProblemPolygon} />
				</div>
			</LegendItem>

			<LegendItem label="Объект в стадии строительства">
				<img className={s.LegendIcon} src={schoolsUnderConstructionSvg} />
			</LegendItem>

			<LegendItem label="Рекомендуемое месторасположение">
				<img className={s.LegendIcon} src={greenFlagSvg} />
			</LegendItem>
		</div>
	)
}
