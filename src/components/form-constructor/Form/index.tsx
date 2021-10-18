import React, { DetailedHTMLProps, FormHTMLAttributes } from 'react'

// Styles
import s from './index.module.css'

export const Form = ({ children, ...rest }: IProps) => {
	return (
		<form className={s.Form} {...rest}>
			{children}
		</form>
	)
}

type IProps = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
