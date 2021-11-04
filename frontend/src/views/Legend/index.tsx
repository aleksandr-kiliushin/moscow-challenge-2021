import React from 'react'

// Styles
import s from './index.module.css'

// Assets
import greenFlagSvg from '../../assets/green-flag.svg'
import schoolsUnderConstructionSvg from '../../assets/school-under-construction.svg'

export const Legend = () => {
	return (
		<div className={s.Legend}>
			<img className={s.LegendIcon} src={schoolsUnderConstructionSvg} />
			<img className={s.LegendIcon} src={greenFlagSvg} />
		</div>
	)
}
