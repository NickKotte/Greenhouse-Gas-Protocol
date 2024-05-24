import { ActionIcon, ButtonGroup, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export default function UtilityBar() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	return (
		<ButtonGroup
			style={{
				display: 'flex',
				marginRight: 20,
				marginTop: 15,
				position: 'absolute',
				right: 0,
			}}
		>
			<ActionIcon
				variant="gradient"
				size="lg"
				aria-label="Toggle dark mode"
				onClick={() => toggleColorScheme()}
			>
				{colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
			</ActionIcon>
		</ButtonGroup>
	);
}
