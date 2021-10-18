import React, { ReactNode, useState } from 'react'

// Styles
import s from './index.module.css'

export const Datalist = ({ options, renderOption, selectedOptionText = '- select -' }: IProps) => {
	const [isListShown, setIsListShown] = useState(false)
	return (
		<>
			<div onClick={() => setIsListShown(!isListShown)}>{selectedOptionText}</div>

			{isListShown && (
				<div className={s.List} onClick={() => setIsListShown(false)}>
					{options.map(renderOption)}
				</div>
			)}
		</>
	)
}

interface IProps {
	optionClassName?: string
	options: any[]
	renderOption: (option: any) => ReactNode
	selectedOptionText?: string
}
