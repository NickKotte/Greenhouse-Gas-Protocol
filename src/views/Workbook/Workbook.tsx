import { Box, Group, Text } from '@mantine/core';
import { $appState } from '@/stores/app';
import { useStore } from '@nanostores/react';
import Bento from './Bento';
import {
	IconBuildingWarehouse,
	IconCalendarStats,
	IconNotebook,
} from '@tabler/icons-react';
import InventoryYearRow from './InventoryYearRow';
import FacilityRow from './FacilityRow';
import { modals } from '@mantine/modals';
import { EditableText } from '@/components/Editables/EditableText';
import { notifications } from '@mantine/notifications';
import { useUpdateWorkbookName } from '@/api/workbook';
import type { Workbook } from '@/types';
import { useNotifyWithUndo } from '@/util/useNotifyWithUndo';
import { useGetInventoryYears } from '@/api/workbook/inventoryYear.api';
import { useGetFacilities } from '@/api/workbook/facilities.api';
import { useQueryClient } from '@tanstack/react-query';

const Workbook = () => {
	const { workbook } = useStore($appState);
	const { name: companyName } = workbook;
	const queryClient = useQueryClient();
	const notify = useNotifyWithUndo();
	const { mutate: updateWorkbookName } = useUpdateWorkbookName({
		onSuccess: (data: Workbook) => {
			const newName = data.name;
			$appState.setKey('workbook.name', newName);
			notify(companyName, newName, () => {
				updateWorkbookName({
					name: companyName,
					workbookId: workbook.workbook_id,
				});
			});
			queryClient.invalidateQueries({
				queryKey: ['workbooks'],
			});
		},
		onError: (error) => {
			notifications.show({
				title: 'Error',
				message: error.message,
			});
		},
	});
	const {
		data: inventoryYears,
		isFetching: inventoryYearsLoading,
		error: inventoryYearsError,
	} = useGetInventoryYears();
	const {
		data: facilities,
		isFetching: facilitiesLoading,
		error: facilitiesError,
	} = useGetFacilities();

	if (!workbook.workbook_id) return null;

	return (
		<Box w="100%" h="100%">
			<EditableText
				value={companyName}
				onDoneEditing={(value) => {
					updateWorkbookName({
						name: value,
						workbookId: workbook.workbook_id,
					});
				}}
				label="Workbook Name"
				Icon={IconNotebook}
			/>
			<Group gap="md" grow align="start">
				<Bento
					loading={inventoryYearsLoading}
					error={inventoryYearsError}
					header="Inventory Years"
					description="These are the years in which energy was bought or used"
					icon={IconCalendarStats}
					badgeText={`${inventoryYears?.length} years`}
					onClick={() => {
						modals.openContextModal({
							modal: 'EditInventoryYear',
							radius: 'md',
							innerProps: { year: null },
							title: 'Add an Inventory Year',
							size: 'lg',
						});
					}}
				>
					{inventoryYears?.length ? (
						inventoryYears?.map((year) => (
							<InventoryYearRow year={year} key={year.year} />
						))
					) : (
						<Text c="dimmed">This list is empty</Text>
					)}
				</Bento>
				<Bento
					loading={facilitiesLoading}
					error={facilitiesError}
					header="Facilities"
					description="These are the facilities which will be used for calculations"
					icon={IconBuildingWarehouse}
					badgeText={`${facilities?.length} facilities`}
					onClick={() => {
						modals.openContextModal({
							modal: 'EditFacility',
							innerProps: { facility: null },
							title: 'Add a Facility',
							radius: 'md',
							size: 'lg',
						});
					}}
				>
					{facilities?.length ? (
						facilities?.map((facility) => (
							<FacilityRow
								facility={facility}
								key={facility.name}
							/>
						))
					) : (
						<Text c="dimmed">This list is empty</Text>
					)}
				</Bento>
			</Group>
		</Box>
	);
};

export default Workbook;
