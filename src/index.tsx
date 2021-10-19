import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// Models
import { store } from '#models/store'

// Components
import { App } from './views'

// Styles
import './index.css'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.querySelector('#root'),
)
