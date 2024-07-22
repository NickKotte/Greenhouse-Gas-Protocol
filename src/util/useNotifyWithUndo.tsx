import { notifications, useNotifications } from '@mantine/notifications';
import { Text } from '@mantine/core';
import NotificationMessage from '@/components/NotificationMessage';

export const useNotifyWithUndo = () => {
	const notificationsState = useNotifications();
	const notify = (
		originalValue: string,
		newValue: string,
		action: () => void,
	) => {
		const notifExists = notificationsState.notifications.find(
			(notif) => notif.id === `workbook-name-update-${originalValue}`,
		);
		if (notifExists) {
			notifications.update({
				id: `workbook-name-update-${originalValue}`,
				title: 'Undo',
				message: (
					<NotificationMessage
						message={
							<Text span>
								Workbook name reverted back to{' '}
								<Text span c="blue">
									{newValue}
								</Text>
							</Text>
						}
					/>
				),
			});
		} else {
			notifications.show({
				id: `workbook-name-update-${newValue}`,
				title: 'Success',
				message: (
					<NotificationMessage
						message={
							<Text span>
								Workbook name updated to{' '}
								<Text span c="blue">
									{newValue}
								</Text>
							</Text>
						}
						action={action}
					/>
				),
				color: 'green',
				autoClose: 10000,
				withCloseButton: true,
			});
		}
	};

	return notify;
};
