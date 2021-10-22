import React from 'react'

// Styles
import s from './index.module.css'

// Types
import { ReactNode } from 'react'

export const TableCell = ({ children, onClick = () => {} }: IProps) => {
	return (
		<div className={s.TableCell} onClick={onClick}>
			{children}
		</div>
	)
}

interface IProps {
	children: ReactNode
	onClick?: () => void
}
