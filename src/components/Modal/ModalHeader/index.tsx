import React from 'react'
import cx from 'classnames'

// Types
import { ReactNode } from 'react'

export const ModalHeader = ({ children, cnModalHeader = '' }: IProps) => {
	const cxModalHeader = cx({
		[cnModalHeader]: !!cnModalHeader,
	})

	return <div className={cxModalHeader}>{children}</div>
}

interface IProps {
	children: ReactNode
	cnModalHeader?: string
}
