import cx from 'classnames'

// Styles
import s from './index.module.css'

export const Notification = ({ notificationData }: IProps) => {
	const { message, title, type } = notificationData

	const cxNotification = cx({
		[s.Notification]: true,
		[s.NotificationError]: type === 'error',
		[s.NotificationSuccess]: type === 'success',
	})

	return (
		<div className={cxNotification}>
			<h4>{title}</h4>
			<p>{message}</p>
		</div>
	)
}

interface IProps {
	notificationData: {
		id: number
		message: string
		title: string
		type: 'error' | 'success'
	}
}
