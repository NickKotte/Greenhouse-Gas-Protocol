import { emissionsColors } from '@/constants';
import { Box, Flex, Text, Tooltip } from '@mantine/core';

const gasDescriptions: Record<string, string> = {
	co2: 'Carbon Dioxide (CO₂) - The primary greenhouse gas emitted through human activities',
	ch4: 'Methane (CH₄) - A greenhouse gas that is more potent than CO₂ but remains in the atmosphere for a shorter time',
	n2o: 'Nitrous Oxide (N₂O) - A powerful greenhouse gas with significant warming potential',
	bio: 'Biogenic CO₂ - Carbon dioxide emissions from biological sources',
	co2e: 'CO₂ Equivalent (CO₂e) - Total climate impact of all gases expressed as CO₂',
};

const ColorLegend = () => {
	return (
		<Flex gap="md" align="center" wrap="wrap" justify="center">
			{Object.entries(emissionsColors)
				.filter(([key]) => key !== 'ef') // Exclude ef from legend
				.map(([key, color]) => (
					<Tooltip
						key={key}
						label={gasDescriptions[key]}
						position="top"
						multiline
						w={200}
					>
						<Flex align="center" gap="xs">
							<Box bg={color} w={10} h={10} />
							<Text
								size="sm"
								style={{ textTransform: 'uppercase' }}
							>
								{key === 'co2'
									? 'CO₂'
									: key === 'ch4'
										? 'CH₄'
										: key === 'n2o'
											? 'N₂O'
											: key === 'co2e'
												? 'CO₂e'
												: key}
							</Text>
						</Flex>
					</Tooltip>
				))}
		</Flex>
	);
};

export default ColorLegend;
