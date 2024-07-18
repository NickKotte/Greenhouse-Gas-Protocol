import {
	Box,
	Divider,
	Paper,
	Title,
	Text,
	Group,
	Button,
	Badge,
} from '@mantine/core';
import { IconPlus, type Icon } from '@tabler/icons-react';

const Bento = ({
	header,
	description,
	children,
	icon: Icon,
	onClick,
	badgeText,
}: {
	header: string;
	description: string;
	children: React.ReactNode;
	icon: Icon;
	onClick: () => void;
	badgeText?: string;
}) => {
	return (
		<Paper p="lg" pb="md" mt="md" radius="md" shadow="sm">
			<Group justify="space-between">
				<Group align="center">
					<Icon size={34} />
					<Title order={3}>{header}</Title>
				</Group>
				{badgeText && <Badge>{badgeText}</Badge>}
			</Group>
			<Divider my="xs" />
			<Text c="dimmed" fz="sm" mb="xs">
				{description}
			</Text>
			<Box p="md" py="xs">
				{children}
			</Box>
			<Divider my="md" />
			{onClick && (
				<Button
					style={{ float: 'right' }}
					radius="md"
					onClick={onClick}
					color="blue"
					variant="filled"
					leftSection={<IconPlus size={18} />}
				>
					Add {header}
				</Button>
			)}
		</Paper>
	);
};

export default Bento;
