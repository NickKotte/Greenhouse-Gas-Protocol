import { Outlet } from 'react-router-dom';
import SideNav from '@/components/SideNav';

const Layout = () => {
	return (
		<div style={{ display: 'flex', flexWrap: 'nowrap', height: '100%' }}>
			<SideNav />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
