import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

// Models
import { setShownInfrastructureType } from '#models/map'

// Styles
import s from './index.module.css'

// Types
import { AppDispatch, RootState } from '#models/store'
import { IInfrastructureType } from '#models/map'

export const _InfrastructureTypeSelect = ({
	setShownInfrastructureType,
	shownInfrastructureType,
}: IProps) => {
	return (
		<div className={s.InfrastructureTypeSelectContainer}>
			<label className={s.InfrastructureTypeSelectLabel}>
				Выберите тип объекта:
				<select
					value={shownInfrastructureType}
					onChange={(event) => {
						setShownInfrastructureType(event.target.value as IInfrastructureType)
					}}
				>
					<option value="mfc">МФЦ</option>
					<option value="schools">Школы</option>
				</select>
			</label>
		</div>
	)
}

const mapStateToProps = (state: RootState) => ({
	shownInfrastructureType: state.map.shownInfrastructureType,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
	setShownInfrastructureType: (type: IInfrastructureType) =>
		dispatch(setShownInfrastructureType(type)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type IProps = ConnectedProps<typeof connector>

export const InfrastructureTypeSelect = connector(_InfrastructureTypeSelect)
