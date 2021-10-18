import React, { useEffect, useState } from 'react'

// Action creators
import { getCategories, getCategoryTypes } from '#models/finance'

// Components
import { Table } from '#components/Table'
import { TableHeader } from '#components/Table/TableHeader'
import { TableRow } from '#components/Table/TableRow'
import { TableCell } from '#components/Table/TableCell'
import { Button } from '#components/Button'
import { CategoryModal } from './CategoryModal'
import { CategoryTableRow } from './CategoryTableRow'

// Utils
import { useAppDispatch, useAppSelector } from '#utils/hooks'

// Styles
import s from './index.module.css'

export const Settings = () => {
	const dispatch = useAppDispatch()
	const [isCategoryCreatingModalShown, setIsCategoryCreatingModalShown] = useState(true)

	const categories = useAppSelector((state) => state.finance.categories)
	const categoryTypes = useAppSelector((state) => state.finance.categoryTypes)

	useEffect(() => {
		dispatch(getCategories())
		dispatch(getCategoryTypes())
	}, [])

	return (
		<>
			<Table>
				<TableHeader cnTableHeader={s.TableHeader}>
					<h3>Finance categories</h3>
				</TableHeader>

				<TableRow cnTableRow={s.TableHeaderRow} isTableHeaderRow>
					<TableCell>Category</TableCell>
					<TableCell>Type</TableCell>
					<TableCell>
						<Button onClick={() => setIsCategoryCreatingModalShown(true)}>+ New</Button>
					</TableCell>
				</TableRow>

				{categories.items.map((category) => (
					<CategoryTableRow
						category={category}
						categoryTypes={categoryTypes.items}
						key={category.id}
					/>
				))}
			</Table>

			{isCategoryCreatingModalShown && (
				<CategoryModal
					category={null}
					categoryTypes={categoryTypes.items}
					closeModal={() => setIsCategoryCreatingModalShown(false)}
				/>
			)}
		</>
	)
}
