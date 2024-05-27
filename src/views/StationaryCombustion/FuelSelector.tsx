import { useState } from 'react';
import { ActionIcon, Box, Group, Select, Text } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';

const fuelTypes = [
	{
		label: 'Agricultural Byproducts',
		value: 'agByprod',
	},
	{
		label: 'Anthracite Coal',
		value: 'anthCoal',
	},
	{
		label: 'Asphalt and Road Oil',
		value: 'asphalt',
	},
	{
		label: 'Aviation Gasoline',
		value: 'avGas',
	},
	{
		label: 'Biodiesel (100%)',
		value: 'biodiesel',
	},
	{
		label: 'Bituminous Coal',
		value: 'bitCoal',
	},
	{
		label: 'Blast Furnace Gas',
		value: 'blastFurnGas',
	},
	{
		label: 'Butane',
		value: 'butane',
	},
	{
		label: 'Butylene',
		value: 'butylene',
	},
	{
		label: 'Coal Coke',
		value: 'coalCoke',
	},
	{
		label: 'Coke Oven Gas',
		value: 'cokeOvenGas',
	},
	{
		label: 'Crude Oil',
		value: 'crudeOil',
	},
	{
		label: 'Distillate Fuel Oil No. 1',
		value: 'dfo1',
	},
	{
		label: 'Distillate Fuel Oil No. 2',
		value: 'dfo2',
	},
	{
		label: 'Distillate Fuel Oil No. 4',
		value: 'dfo4',
	},
	{
		label: 'Ethane',
		value: 'ethane',
	},
	{
		label: 'Ethanol (100%)',
		value: 'ethanol',
	},
	{
		label: 'Ethylene',
		value: 'ethylene',
	},
	{
		label: 'Fuel Gas',
		value: 'fuelGas',
	},
	{
		label: 'Heavy Gas Oils',
		value: 'hgo',
	},
	{
		label: 'Isobutane',
		value: 'isobutane',
	},
	{
		label: 'Isobutylene',
		value: 'isobutylene',
	},
	{
		label: 'Kerosene',
		value: 'kerosene',
	},
	{
		label: 'Kerosene-Type Jet Fuel',
		value: 'jetFuel',
	},
	{
		label: 'Landfill Gas',
		value: 'landfillGas',
	},
	{
		label: 'Lignite Coal',
		value: 'ligCoal',
	},
	{
		label: 'Liquefied Petroleum Gases (LPG)',
		value: 'lpg',
	},
	{
		label: 'Lubricants',
		value: 'lubricants',
	},
	{
		label: 'Mixed (Commercial Sector)',
		value: 'mixedComm',
	},
	{
		label: 'Mixed (Electric Power Sector)',
		value: 'mixedElec',
	},
	{
		label: 'Mixed (Industrial Coking)',
		value: 'mixedIndCoke',
	},
	{
		label: 'Mixed (Industrial Sector)',
		value: 'mixedInd',
	},
	{
		label: 'Motor Gasoline',
		value: 'mogas',
	},
	{
		label: 'Municipal Solid Waste',
		value: 'msw',
	},
	{
		label: 'Naphtha (<401 deg F)',
		value: 'naphtha',
	},
	{
		label: 'Natural Gas',
		value: 'natGas',
	},
	{
		label: 'Natural Gasoline',
		value: 'natGasoline',
	},
	{
		label: 'Other Biomass Gases',
		value: 'otherBioGas',
	},
	{
		label: 'Other Oil (>401 deg F)',
		value: 'otherOil',
	},
	{
		label: 'Peat',
		value: 'peat',
	},
	{
		label: 'Pentanes Plus',
		value: 'pentanes',
	},
	{
		label: 'Petrochemical Feedstocks',
		value: 'petFeedstocks',
	},
	{
		label: 'Petroleum Coke',
		value: 'petCoke',
	},
	{
		label: 'Petroleum Coke (Solid)',
		value: 'petCokeSolid',
	},
	{
		label: 'Plastics',
		value: 'plastics',
	},
	{
		label: 'Propane',
		value: 'propane',
	},
	{
		label: 'Propane Gas',
		value: 'propaneGas',
	},
	{
		label: 'Propylene',
		value: 'propylene',
	},
	{
		label: 'Rendered Animal Fat',
		value: 'animalFat',
	},
	{
		label: 'Residual Fuel Oil No. 5',
		value: 'rfo5',
	},
	{
		label: 'Residual Fuel Oil No. 6',
		value: 'rfo6',
	},
	{
		label: 'Solid Byproducts',
		value: 'solidByprod',
	},
	{
		label: 'Special Naphtha',
		value: 'specialNaphtha',
	},
	{
		label: 'Sub-bituminous Coal',
		value: 'subBitCoal',
	},
	{
		label: 'Tires',
		value: 'tires',
	},
	{
		label: 'Unfinished Oils',
		value: 'unfinishedOils',
	},
	{
		label: 'Used Oil',
		value: 'usedOil',
	},
	{
		label: 'Vegetable Oil',
		value: 'vegOil',
	},
	{
		label: 'Wood and Wood Residuals',
		value: 'wood',
	},
];
export default function FuelSelector() {
	const [searchValue, setSearchValue] = useState('');
	const [editing, setEditing] = useState(false);
	return (
		<>
			{editing ? (
				<Select
					searchable
					searchValue={searchValue}
					onSearchChange={setSearchValue}
					data={fuelTypes}
					autoFocus
					onBlur={() => setEditing(false)}
				/>
			) : (
				<Group>
					<Box>
						<Text size="sm" c="dimmed">
							Fuel Type
						</Text>
						<Text>{fuelTypes[0].label}</Text>
					</Box>
					<ActionIcon
						onClick={() => setEditing(true)}
						variant="subtle"
						size="lg"
						c="gray"
					>
						<IconPencil />
					</ActionIcon>
				</Group>
			)}
		</>
	);
}
