import { useState } from 'react';
import {
	UnstyledButton,
	Tooltip,
	Title,
	rem,
	Image,
	FloatingIndicator,
} from '@mantine/core';
import {
	IconHome2,
	IconDeviceDesktopAnalytics,
	IconBuilding,
	IconBuildingFactory,
	IconUser,
	IconSettings,
} from '@tabler/icons-react';
import classes from '@/css/DoubleNavbar.module.css';

const routes = {
	home: {
		label: 'Home',
		icon: IconHome2,
		path: '/',
		links: [],
	},
	company: {
		label: 'My Company',
		icon: IconBuilding,
		path: '/company',
		links: [],
	},
	facilities: {
		label: 'Facilities',
		icon: IconBuildingFactory,
		path: '/facilities',
		links: [],
	},
	administration: {
		label: 'Administration',
		icon: IconDeviceDesktopAnalytics,
		path: '/administration',
		links: [],
	},
	account: {
		label: 'Account',
		icon: IconUser,
		path: '/account',
		links: [],
	},
	settings: {
		label: 'Settings',
		icon: IconSettings,
		path: '/settings',
		links: [],
	},
};

const routesOrdered = [
	{ ...routes.home },
	{ ...routes.company },
	{ ...routes.facilities },
	{ ...routes.administration },
	{ ...routes.account },
	{ ...routes.settings },
];

const linksMockdata = [
	'Security',
	'Settings',
	'Dashboard',
	'Releases',
	'Account',
	'Orders',
	'Clients',
	'Databases',
	'Pull Requests',
	'Open Issues',
	'Wiki pages',
];

export default function DoubleNavbar() {
	const [active, setActive] = useState(0);
	const [activeLink, setActiveLink] = useState('Settings');
	const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
	const [controlsRefs, setControlsRefs] = useState<
		Record<string, HTMLButtonElement | null>
	>({});

	const setControlRef = (index: number) => (node: HTMLButtonElement) => {
		controlsRefs[index] = node;
		setControlsRefs(controlsRefs);
	};

	const navButtons = routesOrdered.map((link, index) => (
		<Tooltip
			label={link.label}
			position="right"
			withArrow
			transitionProps={{ duration: 0 }}
			key={link.label}
		>
			<UnstyledButton
				onClick={() => setActive(index)}
				ref={setControlRef(index)}
				className={classes.mainLink}
				mod={{ active: index === active }}
				data-active={index === active || undefined}
			>
				<link.icon
					style={{ width: rem(22), height: rem(22) }}
					stroke={1.5}
				/>
			</UnstyledButton>
		</Tooltip>
	));

	const links = routesOrdered[active].links.map((link) => (
		<a
			className={classes.link}
			data-active={activeLink === link || undefined}
			href="#"
			onClick={(event) => {
				event.preventDefault();
				setActiveLink(link);
			}}
			key={link}
		>
			{link}
		</a>
	));

	return (
		<nav className={classes.navbar}>
			<div className={classes.wrapper}>
				<div className={classes.aside}>
					<Image
						src="/icon.png"
						alt="logo"
						style={{
							margin: '40% 0',
							width: '50%',
							objectFit: 'contain',
						}}
					/>
					<div ref={setRootRef} style={{ position: 'relative' }}>
						<FloatingIndicator
							target={controlsRefs[active]}
							parent={rootRef}
							className={classes.indicator}
						/>
						{navButtons}
					</div>
				</div>
				<div className={classes.main}>
					<Title order={4} className={classes.title}>
						{routesOrdered[active].label}
					</Title>

					{links}
				</div>
			</div>
		</nav>
	);
}
