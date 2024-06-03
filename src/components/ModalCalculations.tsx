import { Divider, Grid } from '@mantine/core';
import { Number as NumberFormatter } from './WorkbookRow';

const ModalCalculations = ({
	calculations,
}: {
	calculations: Record<string, number>;
}) => {
	return (
		<>
			<Divider my="lg" label="Results" />
			<Grid>
				<Grid.Col span={2}>
					<NumberFormatter value={calculations.CO2} label="CO2" />
				</Grid.Col>
				<Grid.Col span={2}>
					<NumberFormatter value={calculations.CH4} label="CH4" />
				</Grid.Col>
				<Grid.Col span={2}>
					<NumberFormatter value={calculations.N2O} label="N2O" />
				</Grid.Col>
				<Grid.Col span={2}>
					<NumberFormatter value={calculations.CO2e} label="CO2e" />
				</Grid.Col>
				<Grid.Col span={2}>
					<NumberFormatter value={calculations.BIO} label="BIO" />
				</Grid.Col>
				<Grid.Col span={2}>
					<NumberFormatter value={calculations.EF} label="EF" />
				</Grid.Col>
			</Grid>
		</>
	);
};

export default ModalCalculations;
