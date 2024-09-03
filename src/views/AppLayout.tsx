import SideNav from '@/components/SideNav';
import { Box, Title, Image, Flex, Text, Center } from '@mantine/core';
import { $routing } from '@/stores/route';
import { useStore } from '@nanostores/react';
import NestedSideNav from '@/components/NestedSideNav';
import classes from '@/css/DoubleNavbar.module.css';
import { ProtectedPath } from '../components/ProtectedPath';
import { useNavigate } from 'react-router-dom';
import UtilityBar from '@/components/UtilityBar';

const Layout = () => {
	const routeInfo = useStore($routing);
	const navigate = useNavigate();
	return (
		<ProtectedPath redirectUrl="/login">
			<div
				style={{
					display: 'flex',
					flexWrap: 'nowrap',
					height: '100%',
					flexDirection: 'column',
					minHeight: '100vh',
				}}
			>
				<Box
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						position: 'relative',
						flex: 1,
					}}
				>
					<Flex
						justify="space-between"
						align="center"
						className={classes.title}
					>
						<Flex
							style={{ cursor: 'pointer' }}
							onClick={() => navigate('/')}
						>
							<Image
								src="/icon.png"
								alt="logo"
								style={{
									margin: '',
									width: '30px',
									objectFit: 'contain',
									marginLeft: '10px',
									marginRight: '10px',
								}}
							/>
							<Title order={4}>{routeInfo.label}</Title>
						</Flex>
						<UtilityBar />
					</Flex>
					<Flex wrap="nowrap">
						<SideNav /> <NestedSideNav />
					</Flex>
				</Box>
				<Center>
					<Text size="sm" c="dimmed" mb="xl">
						© 2024 CleanENERGY Manufacturing, All rights reserved
					</Text>
				</Center>
			</div>
		</ProtectedPath>
	);
};

export default Layout;
