import React from 'react'
import cx from 'classnames'

// Types
import { ReactNode } from 'react'

export const ModalHeader = ({ children, cnModalHeader = '' }: IProps) => {
	const cxModalHeader = cx({
		[cnModalHeader]: !!cnModalHeader,
	})

	return <h4 className={cxModalHeader}>{children}</h4>
}

interface IProps {
	children: ReactNode
	cnModalHeader?: string
}
