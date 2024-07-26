import SideNav from '@/components/SideNav';
import { Box, Title, Image, Flex } from '@mantine/core';
import { $routing } from '@/stores/route';
import { useStore } from '@nanostores/react';
import NestedSideNav from '@/components/NestedSideNav';
import classes from '@/css/DoubleNavbar.module.css';
import { ProtectedPath } from '../components/ProtectedPath';

const Layout = () => {
	const routeInfo = useStore($routing);

	return (
		<ProtectedPath redirectUrl="/login">
			<div
				style={{
					display: 'flex',
					flexWrap: 'nowrap',
					height: '100%',
					flexDirection: 'column',
				}}
			>
				<Box
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Flex justify="flex-start" align="center">
						<Image
							src="/icon.png"
							alt="logo"
							style={{
								margin: '',
								width: '30px',
								objectFit: 'contain',
								marginLeft: '10px',
							}}
						/>
						<Title order={4} className={classes.title}>
							{routeInfo.label}
						</Title>
					</Flex>
					<Flex wrap="nowrap">
						<SideNav /> <NestedSideNav />
					</Flex>
				</Box>
			</div>
		</ProtectedPath>
	);
};

export default Layout;
