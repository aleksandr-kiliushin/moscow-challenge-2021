import React from 'react'
import cx from 'classnames'

// Types
import { ReactNode } from 'react'

export const ModalHeader = ({ children, cnModalHeader = '' }: IProps) => {
	const cxModalHeader = cx({
		[cnModalHeader]: !!cnModalHeader,
	})

	return <h2 className={cxModalHeader}>{children}</h2>
}

interface IProps {
	children: ReactNode
	cnModalHeader?: string
}
