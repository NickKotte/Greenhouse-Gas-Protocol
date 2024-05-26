import SideNav from '@/components/SideNav';
import { Box, Title } from '@mantine/core';
import { $routing } from '@/stores/route';
import { useStore } from '@nanostores/react';
import NestedSideNav from '@/components/NestedSideNav';
import classes from '@/css/DoubleNavbar.module.css';

const Layout = () => {
	const routeInfo = useStore($routing);

	return (
		<div
			style={{
				display: 'flex',
				flexWrap: 'nowrap',
				height: '100%',
			}}
		>
			<SideNav />
			<Box
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Title order={4} className={classes.title}>
					{routeInfo.label}
				</Title>
				<NestedSideNav />
			</Box>
		</div>
	);
};

export default Layout;
