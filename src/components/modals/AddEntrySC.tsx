import type { InventoryYear } from '@/types';
import { Divider, Group, Space } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useEffect, useState } from 'react';
import '@mantine/dates/styles.css';
import {
	IconBuildingWarehouse,
	IconCalendarStats,
	IconFlame,
} from '@tabler/icons-react';
import EditWrapper from './EditWrapper';
import { Selectable } from '../Editables/Selectable';
import { fuelTypes_SC, cost_energy_units } from '@/constants';
import { Numerable } from '../Editables/Numerable';
import { calculate } from '@/util';
import ModalCalculations from '../ModalCalculations';
import { useGetInventoryYears } from '@/api/workbook/inventoryYear.api';
import { useGetFacilities } from '@/api/workbook/facilities.api';
import { useUpdateStationaryCombustion } from '@/api/workbook/stationaryCombution.api';
import { notifications } from '@mantine/notifications';

const EditInventoryYear = ({
	context,
	innerProps,
	id,
}: ContextModalProps<{ year: InventoryYear; isEditing?: boolean }>) => {
	const [facility, setFacility] = useState<string>('');
	const [inventoryYear, setInventoryYear] = useState<string>('');
	const [fuelType, setFuelType] = useState<string>('');
	const [amount, setAmount] = useState<number>(0);
	const [units, setUnits] = useState<string>('');
	const [calculations, setCalculations] = useState<Record<string, number>>(
		{},
	);
	const { data: inventoryYears, isLoading: inventoryYearsLoading } =
		useGetInventoryYears();
	const { data: facilities, isLoading: facilitiesLoading } =
		useGetFacilities();

	const { mutate: updateStationaryCombustion } =
		useUpdateStationaryCombustion({
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
			!fuelType ||
			!amount ||
			!units ||
			!Object.keys(calculations).length
		) {
			notifications.show({
				title: 'Error',
				message: 'Please fill out all fields',
				color: 'red',
			});
			return false;
		}
		updateStationaryCombustion({
			operation: 'add',
			stationaryCombustion: {
				facility_id: facility,
				year: Number(inventoryYear),
				fuel_type: fuelType,
				fuel_amount: amount,
				fuel_units: units,
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
		if (fuelType && amount && units) {
			const result = calculate.StationaryCombustion(
				fuelType,
				amount,
				units,
			);
			setCalculations({
				CO2: result.CO2,
				CH4: result.CH4,
				N2O: result.N2O,
				CO2e: result.CO2e,
				EF: result.EF,
				BIO: result.BIO,
			});
		}
	}, [fuelType, amount, units]);
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
					loading={facilitiesLoading}
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
			<Divider my="md" label="Calculation Inputs" />
			<Selectable
				label="Fuel Type"
				placeholder="Select Fuel Type"
				value={fuelType}
				required
				setValue={setFuelType}
				options={fuelTypes_SC}
				withinPortal
			/>
			<Space h="md" />
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
		</EditWrapper>
	);
};

export default EditInventoryYear;
