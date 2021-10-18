// Components
// import { Notification } from './Notification'

// Styles
import s from './index.module.css'

export const NotificationList = () => {
	const notifications: [] = []

	if (notifications.length === 0) return null

	return (
		<div className={s.NotificationList}>
			{/* {notifications.map((notification) => {
				return <Notification key={notification.id} notificationData={notification} />
			})} */}
		</div>
	)
}
