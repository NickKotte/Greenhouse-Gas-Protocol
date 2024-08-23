import { Box, Button, List, ThemeIcon, Title, rem } from '@mantine/core';
import { IconMessageCircle2, IconNotebook } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import WorkbookTable from '@/components/WorkbookTable';
import { useGetPurchasedElectricity } from '@/api/workbook/purchasedElectricity.api';
import { useEffect } from 'react';

const PurchasedElectricity = () => {
	const {
		data: purchasedElectricityData,
		isFetching,
		refetch,
	} = useGetPurchasedElectricity();
	useEffect(() => {
		refetch();
	}, [refetch]);
	return (
		<Box w="100%" h="100%" mb="xl">
			<Title order={2}>Purchased Electricity</Title>
			<Title order={4}>
				Electricity and other sources of energy purchased from your
				local utility (that is not combusted on-site)
			</Title>
			<List
				p="md"
				my="md"
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
					Examples include electricity, steam, and chilled or hot
					water. To generate this energy, utilities combust coal,
					natural gas, and other fossil fuels, emitting carbon
					dioxide, methane, and nitrous oxide in the process.
				</List.Item>
				<List.Item>
					For each fuel type, you will need to enter the amount of
					fuel consumed in the units of your choice (e.g. mmBtu for
					butane).
				</List.Item>
				<List.Item>
					To the right of each entry is the calculated EF (Emission
					Factor) of the fuel usage.
				</List.Item>
			</List>
			<Button
				ml="md"
				mb="md"
				c="white"
				leftSection={<IconNotebook />}
				onClick={() =>
					modals.openContextModal({
						modal: 'AddEntryPE',
						innerProps: {},
						title: 'Add a new entry',
						radius: 'md',
						size: 'lg',
					})
				}
			>
				Add a new entry
			</Button>
			<WorkbookTable
				type="PurchasedElectricity"
				items={purchasedElectricityData || []}
				loading={isFetching}
			/>
		</Box>
	);
};

export default PurchasedElectricity;
