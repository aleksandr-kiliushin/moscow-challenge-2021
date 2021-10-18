import React, { useEffect, useState } from 'react'

// Action creators
import { getCategories } from '#models/finance'

// Components
import { Svg } from '#components/Svg'
import { TableRow } from '#components/Table/TableRow'
import { TableCell } from '#components/Table/TableCell'
import { CategoryModal } from '#views/settings/CategoryModal'

// Styles
import s from './index.module.css'

// Types
import { IFinanceCategory, IFinanceCategoryType } from '#interfaces/finance'

export const CategoryTableRow = ({ category, categoryTypes }: IProps) => {
	const [isCategoryEditingModalShown, setIsCategoryEditingModalShown] = useState(false)

	const { id, name, type } = category

	return (
		<>
			<TableRow cnTableRow={s.TableRow}>
				<TableCell>{name}</TableCell>
				<TableCell>{type.name}</TableCell>
				<TableCell onClick={() => setIsCategoryEditingModalShown(true)}>
					<Svg name="pencil" />
				</TableCell>
				<TableCell>
					<Svg name="trash-can" />
				</TableCell>
			</TableRow>

			{isCategoryEditingModalShown && (
				<CategoryModal
					category={category}
					categoryTypes={categoryTypes}
					closeModal={() => setIsCategoryEditingModalShown(false)}
				/>
			)}
		</>
	)
}

interface IProps {
	category: IFinanceCategory
	categoryTypes: IFinanceCategoryType[]
}
