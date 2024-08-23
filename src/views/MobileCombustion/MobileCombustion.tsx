import { Box, Button, List, ThemeIcon, Title, rem } from '@mantine/core';
import { IconMessageCircle2, IconNotebook } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import WorkbookTable from '@/components/WorkbookTable';
import { useGetMobileCombustion } from '@/api/workbook/mobileCombustion.api';
import { useEffect } from 'react';

const MobileCombustion = () => {
	const {
		data: mobileCombustionData,
		isFetching,
		refetch,
	} = useGetMobileCombustion();
	useEffect(() => {
		refetch();
	}, [refetch]);
	return (
		<Box w="100%" h="100%" mb="xl">
			<Title order={2}>Mobile Combustion</Title>
			<Title order={4}>
				Includes fuel consumption by vehicles that are owned or leased
				by the company. This does not count employee travel (train,
				plane, or auto).
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
					This section allows you to calculate the greenhouse gas
					emissions from your vehicles. Please enter the following
					data for each fuel type consumed for each facility.
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
						modal: 'AddEntryMC',
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
				type="MobileCombustion"
				items={mobileCombustionData || []}
				loading={isFetching}
			/>
		</Box>
	);
};

export default MobileCombustion;
