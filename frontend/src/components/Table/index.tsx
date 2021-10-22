import React, { ReactNode } from 'react'

export const Table = ({ children }: IProps) => {
	return <div>{children}</div>
}

interface IProps {
	children: ReactNode
}
