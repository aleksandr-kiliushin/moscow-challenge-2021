import React from 'react'

// Styles
import s from './index.module.css'

// Types
import { FieldValues, UseFormRegister } from 'react-hook-form'

export const RadioGroup = ({ isRequired = false, name, options, register }: IProps) => {
	return (
		<div className={s.RadioGroup}>
			{options.map(({ id, label }) => (
				<div key={id}>
					<input
						id={id.toString()}
						type="radio"
						value={id}
						{...register(name, {
							required: isRequired,
						})}
					/>
					<label htmlFor={id.toString()}>{label}</label>
				</div>
			))}
		</div>
	)
}

interface IRadioInputOption {
	id: number
	label: string
}

interface IProps {
	isRequired: boolean
	name: string
	options: IRadioInputOption[]
	register: UseFormRegister<FieldValues>
}
