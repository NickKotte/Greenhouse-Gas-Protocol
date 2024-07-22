import {
	Center,
	Flex,
	Paper,
	RingProgress,
	Text,
	Title,
	Tooltip,
} from '@mantine/core';
import classes from '@/css/Results.module.css';

const ScopeBento = ({
	children,
	title,
	onClick,
	tooltip,
	icon,
}: {
	children?: React.ReactNode;
	title: string;
	onClick?: () => void;
	tooltip?: string;
	icon?: React.ReactNode;
}) => {
	return (
		<Tooltip label={tooltip} disabled={!tooltip}>
			<Paper
				p="lg"
				pb="md"
				mt="md"
				radius="md"
				shadow="sm"
				w="100%"
				miw={266}
				style={{ flex: 1 }}
				onClick={onClick}
				className={onClick && classes.glint}
			>
				<Flex justify="space-between">
					<Center h="fit-content">
						{icon}
						<Title order={2} p="xs">
							{title}
						</Title>
					</Center>
					{/* <RingProgress
						size={120}
						thickness={6}
						rootColor="pink"
						roundCaps
						label={
							<Text
								size="xs"
								ta="center"
								px="xs"
								style={{ pointerEvents: 'none' }}
							>
								Hover sections to see tooltips
							</Text>
						}
						sections={[
							{
								value: 40,
								color: 'cyan',
								tooltip: 'Documents – 40 Gb',
							},
							{
								value: 25,
								color: 'orange',
								tooltip: 'Apps – 25 Gb',
							},
							{
								value: 15,
								color: 'grape',
								tooltip: 'Other – 15 Gb',
							},
						]}
					/> */}
				</Flex>
				{children}
			</Paper>
		</Tooltip>
	);
};

export default ScopeBento;
