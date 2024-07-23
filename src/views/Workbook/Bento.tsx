import {
	Box,
	Divider,
	Paper,
	Title,
	Text,
	Group,
	Button,
	Badge,
	LoadingOverlay,
} from '@mantine/core';
import { IconPlus, type Icon } from '@tabler/icons-react';

const Bento = ({
	header,
	description,
	children,
	icon: Icon,
	onClick,
	badgeText,
	loading,
	error,
}: {
	header: string;
	description: string;
	children: React.ReactNode;
	loading?: boolean;
	icon: Icon;
	onClick: () => void;
	badgeText?: string;
	error?: Error | null;
}) => {
	return (
		<Paper p="lg" pb="md" mt="md" radius="md" shadow="sm" pos="relative">
			<LoadingOverlay
				visible={loading}
				overlayProps={{ radius: 'md', blur: 2 }}
				loaderProps={{ type: 'dots' }}
			/>
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
			{error && (
				<Box p="md" py="xs">
					<Text c="red">{error.message}</Text>
				</Box>
			)}
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
