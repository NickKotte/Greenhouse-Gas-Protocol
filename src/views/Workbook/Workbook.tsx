import { Box, Text } from '@mantine/core';
import { $appState } from '@/stores/app';
import { useStore } from '@nanostores/react';
import Bento from './Bento';
import { IconBuildingWarehouse, IconCalendarStats } from '@tabler/icons-react';
import InventoryYearRow from './InventoryYearRow';
import FacilityRow from './FacilityRow';
import { EditableText } from '@/components/EditableText';
import { modals } from '@mantine/modals';

const Workbook = () => {
	const { inventoryYears, facilities, companyName } = useStore($appState);
	return (
		<Box w="100%" h="100%">
			<EditableText
				value={companyName}
				onDone={(value) => {
					$appState.setKey('companyName', value);
				}}
				textProps={{ size: '25px', fw: 700 }}
				size="xl"
			/>
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
						<FacilityRow facility={facility} key={facility.name} />
					))
				) : (
					<Text c="dimmed">This list is empty</Text>
				)}
			</Bento>
		</Box>
	);
};

export default Workbook;