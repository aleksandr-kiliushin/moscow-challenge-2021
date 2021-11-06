import React, { ReactNode } from 'react'

// Styles
import s from './index.module.css'

export const ModalButtonsContainer = ({ children }: IProps) => {
	return <div className={s.ModalButtonsContainer}>{children}</div>
}

interface IProps {
	children: ReactNode
}
