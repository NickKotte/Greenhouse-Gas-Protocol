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
import { useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useUpdateWorkbookName } from '@/api/workbook';
import type { Workbook } from '@/types';
import { useNotifyWithUndo } from '@/util/useNotifyWithUndo';

const Workbook = () => {
	const { inventoryYears, facilities, workbook } = useStore($appState);
	const { name: companyName } = workbook;
	const { appId } = useParams();
	const notify = useNotifyWithUndo();
	const { mutate: updateWorkbookName } = useUpdateWorkbookName({
		onSuccess: (data: Workbook) => {
			const newName = data.name;
			$appState.setKey('workbook.name', newName);
			notify(companyName, newName, () => {
				updateWorkbookName({
					name: companyName,
					workbookId: appId || '',
				});
			});
		},
		onError: (error) => {
			notifications.show({
				title: 'Error',
				message: error.message,
			});
		},
	});

	if (!appId) return null;

	return (
		<Box w="100%" h="100%">
			<EditableText
				value={companyName}
				onDoneEditing={(value) => {
					updateWorkbookName({ name: value, workbookId: appId });
				}}
				label="Workbook Name"
				Icon={IconNotebook}
			/>
			<Group gap="md" grow align="start">
				<Bento
					header="Inventory Years"
					description="These are the years in which energy was bought or used"
					icon={IconCalendarStats}
					badgeText={`${inventoryYears.length} years`}
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
					{inventoryYears.length > 0 ? (
						inventoryYears.map((year) => (
							<InventoryYearRow year={year} key={year.year} />
						))
					) : (
						<Text c="dimmed">This list is empty</Text>
					)}
				</Bento>
				<Bento
					header="Facilities"
					description="These are the facilities which will be used for calculations"
					icon={IconBuildingWarehouse}
					badgeText={`${facilities.length} facilities`}
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
					{facilities.length > 0 ? (
						facilities.map((facility) => (
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
