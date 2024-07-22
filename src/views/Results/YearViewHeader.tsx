import { Grid, Title, RingProgress, Text } from '@mantine/core';

export const YearViewHeader = () => {
	return (
		<Grid gutter="xl" w="100%">
			<Grid.Col
				span={3}
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'center',
				}}
			>
				<Title order={2}>2021</Title>
			</Grid.Col>
			<Grid.Col
				span={6}
				style={{ display: 'flex', justifyContent: 'center' }}
			>
				<RingProgress
					size={170}
					roundCaps
					thickness={16}
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
				/>
			</Grid.Col>
			<Grid.Col
				span={3}
				style={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
			>
				<Title order={3}>5.04 MT</Title>
			</Grid.Col>
		</Grid>
	);
};
