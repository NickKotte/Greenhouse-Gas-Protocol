import { useState } from 'react';
import {
	ActionIcon,
	Box,
	Group,
	NumberInput,
	Select,
	Text,
} from '@mantine/core';
import { IconCheck, IconPencil } from '@tabler/icons-react';

const fuelUnits = [
	{ label: 'Btu', value: 'btu' },
	{ label: 'mmBtu', value: 'mmBtu' },
	{ label: 'therm', value: 'therm' },
	{ label: 'kWh', value: 'kWh' },
	{ label: 'MWh', value: 'mWh' },
	{ label: 'MJ', value: 'mJ' },
	{ label: 'GJ', value: 'gJ' },
];
export default function FuelAmountInput({
	amount,
	units,
}: {
	amount: number;
	units: string;
}) {
	const [searchValue, setSearchValue] = useState('');
	const [localUnit, setLocalUnit] = useState<string | null>(
		units || fuelUnits[0].value,
	);
	const [localAmount, setLocalAmount] = useState<number | string | undefined>(
		amount || 0,
	);
	const [editing, setEditing] = useState(false);
	return (
		<>
			{editing ? (
				<Group>
					<Box>
						<NumberInput
							value={localAmount}
							onChange={setLocalAmount}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									setEditing(false);
								}
							}}
						/>
						<Select
							searchable
							searchValue={searchValue}
							onSearchChange={setSearchValue}
							data={fuelUnits}
							value={localUnit}
							onChange={setLocalUnit}
							autoFocus
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									setEditing(false);
								}
							}}
						/>
					</Box>
					<ActionIcon onClick={() => setEditing(false)}>
						<IconCheck />
					</ActionIcon>
				</Group>
			) : (
				<Group>
					<Box>
						<Text c="dimmed" size="sm">
							Amount of fuel
						</Text>
						<Text>
							{localAmount} {localUnit}
						</Text>
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
