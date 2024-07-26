import { Accordion, Box, Center, Flex, Stack, Text } from '@mantine/core';
import ScopeBento from './Scope/ScopeView';
import ScopeStat from './Scope/ScopeStat';
import { useState } from 'react';
import { IconBuildingFactory, IconFileAnalytics } from '@tabler/icons-react';

const YearViewBody = () => {
	const [value, setValue] = useState<string | null>(null);
	const handleClick = () => {
		console.log('hello');
		if (value === 'scopes') {
			setValue(null);
		} else {
			setValue('scopes');
		}
	};
	return (
		<Stack w="100%">
			<Box>
				<Text>Total for this year was 5.04 MT</Text>
			</Box>
			<Accordion value={value} onChange={setValue}>
				<Center w="100%">
					<Flex gap={10} w="100%" wrap="wrap">
						<ScopeBento
							title="Facility 1"
							icon={<IconBuildingFactory size={35} />}
						>
							<ScopeStat title="EMFs" value="100" diff={10} />
						</ScopeBento>
						<ScopeBento
							onClick={handleClick}
							title="Total 2021"
							tooltip="Click to see more"
						></ScopeBento>
					</Flex>
				</Center>
				<Accordion.Item value="scopes">
					<Accordion.Panel>
						<ScopeBento
							title="Scope 1"
							icon={<IconFileAnalytics size={35} />}
						>
							Labore anim commodo deserunt esse culpa consequat
							consequat est elit laboris commodo. Labore anim
							commodo deserunt esse culpa consequat consequat est
							elit laboris commodo.
						</ScopeBento>
						<ScopeBento
							title="Scope 2"
							icon={<IconFileAnalytics size={35} />}
						>
							Velit consectetur sunt consectetur non irure laboris
							eu sunt cupidatat.
						</ScopeBento>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Stack>
	);
};

export default YearViewBody;
