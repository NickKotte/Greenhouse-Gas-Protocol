import { useState } from 'react';
import { ActionIcon, Box, Group, Select, Text, Tooltip } from '@mantine/core';
import { IconGasStation, IconPencil } from '@tabler/icons-react';

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
export default function FuelSelector({
	fuelType,
	editable = true,
	required = false,
	onDoneEditing = () => {},
	setFuelType = () => {},
}: {
	/**
	 * The fuel type
	 */
	fuelType: string | null;
	/**
	 * Whether the input is required
	 * @default false
	 */
	required?: boolean;
	/**
	 * Whether the input is editable
	 * @default true
	 */
	editable?: boolean;
	/**
	 * Callback function to be called when editable is false and the units are changed
	 * @required editable = false
	 */
	setFuelType?: (fuelType: string) => void;
	/**
	 * Callback function to be called when editable is true and the user is done editing
	 * @param {string} fuelType - The fuel type
	 */
	onDoneEditing?: (fuelType: string) => void;
}) {
	const [searchValue, setSearchValue] = useState('');
	const [localValue, setLocalValue] = useState(fuelTypes[0].value);
	const [editing, setEditing] = useState(false);
	const handleChange = (value: string | null) => {
		if (value === null) return;
		if (editable) {
			setLocalValue(value);
		} else {
			setFuelType(value);
		}
	};
	const handleDoneEditing = () => {
		if (!editable) return;
		setEditing(false);
		onDoneEditing?.(localValue);
	};
	return (
		<>
			{editing || !editable ? (
				<Select
					value={editable ? localValue : fuelType}
					onChange={handleChange}
					searchable
					searchValue={searchValue}
					onSearchChange={setSearchValue}
					data={fuelTypes}
					autoFocus={editable}
					onBlur={handleDoneEditing}
					label="Fuel Type"
					leftSection={<IconGasStation />}
					required={required}
					allowDeselect={false}
				/>
			) : (
				<Box>
					<Text size="sm" c="dimmed">
						Fuel Type
					</Text>
					<Group wrap="nowrap">
						<IconGasStation style={{ color: 'gray' }} size={20} />
						<Tooltip
							label={searchValue || fuelTypes[0].label}
							withArrow
							position="bottom"
						>
							<Text truncate="end" w={200}>
								{searchValue || fuelTypes[0].label}
							</Text>
						</Tooltip>
						<ActionIcon
							onClick={() => setEditing(true)}
							variant="subtle"
							size="lg"
							c="gray"
						>
							<IconPencil />
						</ActionIcon>
					</Group>
				</Box>
			)}
		</>
	);
}
