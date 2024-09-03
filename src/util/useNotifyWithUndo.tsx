import { notifications, useNotifications } from '@mantine/notifications';
import NotificationMessage from '@/components/NotificationMessage';

interface NotifyOptions {
	id: string;
	title: string;
	color?: string;
	autoClose?: number | boolean;
	withCloseButton?: boolean;
}

export const useNotifyWithUndo = () => {
	const notificationsState = useNotifications();

	const notify = (
		originalValue: string,
		newValue: string,
		action: () => void,
		options: NotifyOptions,
		getMessage: (value: string) => React.ReactNode,
	) => {
		const notifExists = notificationsState.notifications.find(
			(notif) => notif.id === `${options.id}-${originalValue}`,
		);

		if (notifExists) {
			notifications.update({
				id: `${options.id}-${originalValue}`,
				title: options.title,
				message: <NotificationMessage message={getMessage(newValue)} />,
			});
		} else {
			notifications.show({
				id: `${options.id}-${newValue}`,
				title: options.title,
				message: (
					<NotificationMessage
						message={getMessage(newValue)}
						action={action}
					/>
				),
				color: options.color || 'green',
				autoClose:
					options.autoClose !== undefined ? options.autoClose : 10000,
				withCloseButton:
					options.withCloseButton !== undefined
						? options.withCloseButton
						: true,
			});
		}
	};

	return notify;
};
