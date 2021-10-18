import React, { useEffect } from 'react'

// Styles
import s from './index.module.css'

export const App = () => {
	/** Initialize app. */
	useEffect(() => {
		// dispatch(getCurrentUserData())
	}, [])

	return (
		<div className={s.Layout}>
			<div>map</div>
			<div>table</div>
		</div>
	)
}
