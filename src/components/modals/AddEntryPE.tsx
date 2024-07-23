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
import { workbook } from '@/stores/app';
import EditWrapper from './EditWrapper';
import { Selectable } from '../Editables/Selectable';
import { cost_energy_units } from '@/constants';
import { Numerable } from '../Editables/Numerable';
import { calculate } from '@/util';
import ModalCalculations from '../ModalCalculations';
import { useGetFacilities } from '@/api/workbook/facilities.api';
import { useGetInventoryYears } from '@/api/workbook/inventoryYear.api';
import { useUpdatePurchasedElectricity } from '@/api/workbook/purchasedElectricity.api';
import { notifications } from '@mantine/notifications';

const EditInventoryYear = ({
	context,
	innerProps,
	id,
}: ContextModalProps<{ year: InventoryYear; isEditing?: boolean }>) => {
	const { data: inventoryYears, isFetching: inventoryYearsLoading } =
		useGetInventoryYears();
	const { data: facilities, isFetching: facilitiesLoading } =
		useGetFacilities();
	const [facility, setFacility] = useState<string>('');
	const [inventoryYear, setInventoryYear] = useState<string>('');
	const [amount, setAmount] = useState<number>(0);
	const [units, setUnits] = useState<string>('');
	const [calculations, setCalculations] = useState<Record<string, number>>(
		{},
	);
	const [error, setError] = useState('');
	const { mutate: updatePurchasedElectricity } =
		useUpdatePurchasedElectricity({
			onSuccess: () => {
				notifications.show({
					title: 'Success',
					message: 'Stationary Combustion data updated successfully',
				});
			},
			onError: (err) => {
				notifications.show({
					title: 'Error',
					message: err.message,
					color: 'red',
				});
			},
		});

	const handleSave = () => {
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
		updatePurchasedElectricity({
			operation: 'add',
			purchasedElectricity: {
				facility_id: facility,
				year: Number(inventoryYear),
				electricity_amount: amount,
				electricity_units: units,
			},
			results: {
				co2: calculations.CO2,
				ch4: calculations.CH4,
				n2o: calculations.N2O,
				co2e: calculations.CO2e,
				ef: calculations.EF,
				bio: calculations.BIO,
			},
		});
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
					loading={facilitiesLoading}
					placeholder="Select a Facility"
					options={facilities?.map((facility) => ({
						value: facility.id,
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
					loading={inventoryYearsLoading}
					placeholder="Select Inventory Year"
					options={inventoryYears?.map((year) => ({
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
