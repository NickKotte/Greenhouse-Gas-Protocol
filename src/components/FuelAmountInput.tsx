import { useRef, useState } from 'react';
import {
	ActionIcon,
	Box,
	Group,
	NumberInput,
	Select,
	Text,
} from '@mantine/core';
import { IconCheck, IconFlame, IconPencil } from '@tabler/icons-react';

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
	amount = 0,
	units = fuelUnits[0].value,
	setAmount = () => {},
	setUnits = () => {},
	required = false,
	editable = true,
	onDoneEditing = () => {},
}: {
	/**
	 * The amount of fuel
	 */
	amount?: number | null;
	/**
	 * The units of fuel
	 */
	units?: string | null;
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
	 * Callback function to be called when editable is false and the amount is changed
	 * @required editable = false
	 */
	setAmount?: (amount: number) => void;
	/**
	 * Callback function to be called when editable is false and the units are changed
	 * @required editable = false
	 */
	setUnits?: (units: string) => void;
	/**
	 * Callback function to be called when editable is true and the user is done editing
	 * @param {number} amount - The amount of fuel
	 * @param {string} units - The units of fuel
	 */
	onDoneEditing?: (amount: number, units: string) => void;
}) {
	const [searchValue, setSearchValue] = useState<string>('');
	const [localUnit, setLocalUnit] = useState<string>(
		units || fuelUnits[0].value,
	);
	const [localAmount, setLocalAmount] = useState<number | string | undefined>(
		amount || 0,
	);
	const [editing, setEditing] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const handleAmountChange = (value: string | number) => {
		if (editable) {
			setLocalAmount(value);
		} else {
			setAmount(+value);
		}
	};
	const handleUnitChange = (value: string | null) => {
		if (value === null) return;
		if (editable) {
			setLocalUnit(value);
		} else {
			setUnits(value);
		}
	};

	const handleDoneEditing = () => {
		setEditing(false);
		if (localAmount === undefined) return;
		onDoneEditing?.(+localAmount, localUnit);
	};

	return (
		<>
			{editing || !editable ? (
				<Box pb="md" pr="sm" ref={ref}>
					<Group wrap="nowrap" grow={!editable}>
						<NumberInput
							label="Amount of fuel"
							value={editable ? localAmount : amount || 0}
							onChange={handleAmountChange}
							required={required}
							thousandSeparator=","
							allowNegative={false}
							leftSection={<IconFlame />}
							min={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleDoneEditing();
								}
							}}
						/>
						<Select
							label="Units"
							searchable
							searchValue={searchValue}
							onSearchChange={setSearchValue}
							data={fuelUnits}
							value={editable ? localUnit : units}
							onChange={handleUnitChange}
							required={required}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleDoneEditing();
								}
							}}
							allowDeselect={false}
						/>
						{editable ? (
							<ActionIcon onClick={() => handleDoneEditing()}>
								<IconCheck />
							</ActionIcon>
						) : null}
					</Group>
				</Box>
			) : (
				<Box>
					<Text c="dimmed" size="sm">
						Amount of fuel
					</Text>
					<Group>
						<Text>
							{localAmount} {localUnit}
						</Text>
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
