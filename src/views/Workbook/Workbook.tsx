import { Box, Group, List, rem, Text, ThemeIcon, Title } from '@mantine/core';
import { $appState } from '@/stores/app';
import { useStore } from '@nanostores/react';
import Bento from './Bento';
import {
	IconBuildingWarehouse,
	IconCalendarStats,
	IconMessageCircle2,
	IconNotebook,
} from '@tabler/icons-react';
import InventoryYearRow from './InventoryYearRow';
import FacilityRow from './FacilityRow';
import { modals } from '@mantine/modals';
import { EditableText } from '@/components/Editables/EditableText';
import { notifications } from '@mantine/notifications';
import { useUpdateWorkbookName } from '@/api/workbook';
import type { Workbook as WorkbookType } from '@/types';
import { useNotifyWithUndo } from '@/util/useNotifyWithUndo';
import { useGetInventoryYears } from '@/api/workbook/inventoryYear.api';
import { useGetFacilities } from '@/api/workbook/facilities.api';
import { useQueryClient } from '@tanstack/react-query';
import NaicsSelector from '@/components/NaicsSelector';

const Workbook = () => {
	const { workbook } = useStore($appState);
	const { name: companyName, naics_code: naicsCode } = workbook;
	const queryClient = useQueryClient();
	const notify = useNotifyWithUndo();
	const { mutate: updateWorkbookName } = useUpdateWorkbookName({
		onSuccess: (data: WorkbookType) => {
			const newName = data.name;
			$appState.setKey('workbook', data);
			notify(companyName, newName, () => {
				updateWorkbookName({
					name: companyName,
					workbookId: workbook.workbook_id,
					naics_code: naicsCode || undefined,
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
			<Title order={2}>Workbook Data</Title>
			<List
				p="md"
				mb="md"
				spacing="sm"
				center
				icon={
					<ThemeIcon color="teal" radius="xl" size={24}>
						<IconMessageCircle2
							style={{ width: rem(16), height: rem(16) }}
						/>
					</ThemeIcon>
				}
			>
				<List.Item>
					Welcome to the CleanENERGY Greener Factory Toolkit! To get
					started, please provide the following information. This data
					will be used in later steps to perform calculations and
					generate reports.
				</List.Item>
				<List.Item>
					Don't forget to enter the name for your workbook. This will
					help you identify it later.
				</List.Item>
			</List>
			<Group gap="md" grow align="start" pl="lg">
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
				<NaicsSelector
					value={naicsCode}
					onChange={(value) => {
						updateWorkbookName({
							naics_code: value,
							workbookId: workbook.workbook_id,
							name: companyName,
						});
					}}
				/>
			</Group>
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
