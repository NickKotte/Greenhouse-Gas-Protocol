import type { InventoryYear, PurchasedElectricityData } from '@/types';
import { Text, Divider, Group } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useEffect, useState } from 'react';
import '@mantine/dates/styles.css';
import {
	IconBuildingWarehouse,
	IconCalendarStats,
	IconFlame,
} from '@tabler/icons-react';
import { $appState, workbook } from '@/stores/app';
import { useStore } from '@nanostores/react';
import EditWrapper from './EditWrapper';
import { Selectable } from '../Editables/Selectable';
import { cost_energy_units } from '@/constants';
import { Numerable } from '../Editables/Numerable';
import { calculate } from '@/util';
import ModalCalculations from '../ModalCalculations';

const EditInventoryYear = ({
	context,
	innerProps,
	id,
}: ContextModalProps<{ year: InventoryYear; isEditing?: boolean }>) => {
	const { inventoryYears, facilities } = useStore($appState);
	const [facility, setFacility] = useState<string>('');
	const [inventoryYear, setInventoryYear] = useState<string>('');
	const [amount, setAmount] = useState<number>(0);
	const [units, setUnits] = useState<string>('');
	const [calculations, setCalculations] = useState<Record<string, number>>(
		{},
	);
	const [error, setError] = useState('');

	const handleSave = () => {
		console.log(inventoryYear);
		if (
			!facility ||
			!inventoryYear ||
			!amount ||
			!units ||
			!Object.keys(calculations).length
		) {
			setError('Please fill out all fields');
			return false;
		}
		workbook.addItem({
			facilityId: facility,
			year: Number(inventoryYear),
			description: 'Voluptate labore veniam ad non pariatur.',
			amountOfElectricityConsumption: amount,
			units,
			co2Tonnes: calculations.CO2,
			ch4Tonnes: calculations.CH4,
			n2oTonnes: calculations.N2O,
			co2eTonnes: calculations.CO2e,
			efKgCo2ePerKwh: calculations.EF,
			biofuelCo2Tonnes: calculations.BIO,
		} as PurchasedElectricityData);
		return true;
	};
	useEffect(() => {
		if (amount && units) {
			const result = calculate.PurchasedElectricity(amount, units);
			setCalculations({
				CO2: result.CO2,
				CH4: result.CH4,
				N2O: result.N2O,
				CO2e: result.CO2e,
				EF: result.EF,
				BIO: result.BIO,
			});
		}
	}, [amount, units]);
	return (
		<EditWrapper
			context={context}
			innerProps={innerProps}
			onSave={handleSave}
			id={id}
		>
			<Group grow>
				<Selectable
					value={facility}
					setValue={setFacility}
					label="Facility"
					placeholder="Select a Facility"
					options={facilities.map((facility) => ({
						value: facility.name,
						label: facility.name,
					}))}
					required
					allowDeselect={false}
					leftSection={<IconBuildingWarehouse />}
					withinPortal
				/>
				<Selectable
					value={inventoryYear}
					setValue={setInventoryYear}
					label="Inventory Year"
					placeholder="Select Inventory Year"
					options={inventoryYears.map((year) => ({
						value: year.year.toString(),
						label: year.year.toString(),
					}))}
					required
					allowDeselect={false}
					leftSection={<IconCalendarStats />}
					withinPortal
				/>
			</Group>
			<Divider my="lg" label="Calculation Inputs" />
			<Group grow>
				<Numerable
					label="Amount"
					placeholder="Enter Amount"
					required
					value={amount}
					setValue={setAmount}
					leftIcon={IconFlame}
				/>
				<Selectable
					label="Units"
					placeholder="Select Units"
					required
					value={units}
					setValue={setUnits}
					options={cost_energy_units}
					withinPortal
				/>
			</Group>
			<ModalCalculations calculations={calculations} />
			<Text size="sm" c="red">
				{error}
			</Text>
		</EditWrapper>
	);
};

export default EditInventoryYear;
