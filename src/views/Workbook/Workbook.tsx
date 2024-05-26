import { Box, Text, Title } from '@mantine/core';
import { $appState } from '@/stores/app';
import { useStore } from '@nanostores/react';
import Bento from './Bento';
import { IconBuildingWarehouse, IconCalendarStats } from '@tabler/icons-react';
import InventoryYearRow from './InventoryYearRow';
import FacilityRow from './FacilityRow';

const Workbook = () => {
	const { inventoryYears, facilities } = useStore($appState);
	return (
		<Box w="100%" h="100%">
			<Title>Apple Co.</Title>
			<Bento
				header="Inventory Years"
				description="These are the years in which energy was bought or used"
				icon={IconCalendarStats}
				badgeText={`${inventoryYears.length} years`}
				onClick={() => {}}
			>
				{inventoryYears.map((year) => (
					<InventoryYearRow year={year} key={year.year} />
				))}
			</Bento>
			<Bento
				header="Facilities"
				description="These are the facilities which will be used for calculations"
				icon={IconBuildingWarehouse}
				badgeText={`${facilities.length} facilities`}
				onClick={() => {}}
			>
				{facilities.map((facility) => (
					<FacilityRow facility={facility} key={facility.name} />
				))}
			</Bento>
		</Box>
	);
};

export default Workbook;
