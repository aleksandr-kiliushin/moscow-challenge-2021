import React from 'react'
import cx from 'classnames'

// Styles
import s from './index.module.css'

// Types
import { ReactNode } from 'react'

export const TableRow = ({ children, cnTableRow = '', isTableHeaderRow = false }: IProps) => {
	const cxTableHeaderRow = cx({
		[s.TableRow]: true,
		[s.TableHeaderRow]: isTableHeaderRow,
		[cnTableRow]: !!cnTableRow,
	})

	return <div className={cxTableHeaderRow}>{children}</div>
}

interface IProps {
	children: ReactNode
	cnTableRow?: string
	isTableHeaderRow?: boolean
}
