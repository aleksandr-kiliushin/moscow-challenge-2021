import React, { useEffect } from 'react'

// Styles
import s from './index.module.css'

// Types
import { ReactNode, SyntheticEvent } from 'react'

export const Modal = ({ children, closeModal }: IProps) => {
	const onScreenClick = (e: SyntheticEvent<HTMLDivElement>) => {
		const isUnderlayClicked = (e.target as HTMLDivElement).matches('.' + s.ModalUnderlay)

		if (!isUnderlayClicked) return

		closeModal()
	}

	return (
		<div className={s.ModalUnderlay} onClick={onScreenClick}>
			<div className={s.Modal}>{children}</div>
		</div>
	)
}

interface IProps {
	children: ReactNode
	closeModal: () => void
}
