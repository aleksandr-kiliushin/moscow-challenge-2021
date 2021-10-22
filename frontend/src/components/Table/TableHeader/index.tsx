import React from 'react'
import cx from 'classnames'

// Styles
import s from './index.module.css'

// Types
import { ReactNode } from 'react'

export const TableHeader = ({ children, cnTableHeader = '' }: IProps) => {
	const cxTableHeader = cx({
		[s.TableHeader]: true,
		[cnTableHeader]: !!cnTableHeader,
	})

	return <div className={cxTableHeader}>{children}</div>
}

interface IProps {
	children: ReactNode
	cnTableHeader?: string
}
