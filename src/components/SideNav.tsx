import { useState, type SetStateAction, useEffect, useCallback } from 'react';
import {
	UnstyledButton,
	Tooltip,
	rem,
	Image,
	FloatingIndicator,
} from '@mantine/core';
import classes from '@/css/DoubleNavbar.module.css';
import { $routing, $activeLink } from '@/stores/route';
import { routes } from '@/stores/route';
import { $initialized } from '@/stores/user';
import { useStore } from '@nanostores/react';
import { useNavigate } from 'react-router-dom';

const routesOrdered = [
	{ ...routes.company },
	{ ...routes.facilities },
	{ ...routes.administration },
	{ ...routes.settings },
];

export default function DoubleNavbar() {
	const windowPath = window.location.pathname;
	const route = useStore($routing);
	const appInitialized = useStore($initialized);
	const navigate = useNavigate();
	const [activeRoute, setActive] = useState(
		routesOrdered.findIndex((r) => route.label === r.label),
	);
	const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
	const [controlsRefs, setControlsRefs] = useState<
		Record<string, HTMLButtonElement | null>
	>({});

	const setControlRef = (index: number) => (node: HTMLButtonElement) => {
		controlsRefs[index] = node;
		setControlsRefs(controlsRefs);
	};

	const handleRouteChange = useCallback(
		(index: number | SetStateAction<number>) => {
			const newIndex =
				typeof index === 'function' ? index(activeRoute) : index;
			const newRoute = routesOrdered[newIndex];
			const links = newRoute?.links;
			setActive(newIndex);
			$routing.set(newRoute);
			if (!links) return;
			navigate(
				!links.length
					? newRoute.path
					: `${newRoute.path}/${links.find((link) => link.path)?.path}` ||
							'',
			);
		},
		[activeRoute, navigate],
	);

	useEffect(() => {
		if (!appInitialized) return;
		const [, appId, main, sub] = windowPath.split('/');
		const validAppId = appId.startsWith('app'); // TODO: add actual validation
		const validMainRoute = routesOrdered.find((r) => r.path === main);
		const mainroute = validMainRoute || route;
		const validSubRoute = mainroute?.links?.find(
			(link) => link.path && link.path === sub,
		);
		const subroute =
			validSubRoute || mainroute?.links?.find((link) => !!link.path);
		const newPath =
			`/app/${mainroute.path}` + (subroute ? `/${subroute.path}` : '');
		if (windowPath !== newPath) {
			navigate(newPath);
		}
		// set the main sidebar
		setActive(routesOrdered.findIndex((r) => r.path === mainroute?.path));
		// set the nested sidebar
		$routing.set(mainroute);
		$activeLink.set(subroute?.label || mainroute?.label || null);
	}, [appInitialized, navigate, route, route.links, route.path, windowPath]);

	const navButtons = routesOrdered.map((link, index) => (
		<Tooltip
			label={link.label}
			position="right"
			withArrow
			transitionProps={{ duration: 0 }}
			key={link.label}
		>
			<UnstyledButton
				onClick={() => handleRouteChange(index)}
				ref={setControlRef(index)}
				className={classes.mainLink}
				mod={{ active: index === activeRoute }}
				data-active={index === activeRoute || undefined}
			>
				<link.icon
					style={{ width: rem(22), height: rem(22) }}
					stroke={1.5}
				/>
			</UnstyledButton>
		</Tooltip>
	));

	return (
		<nav className={classes.navbar}>
			<Image
				src="/icon.png"
				alt="logo"
				style={{
					margin: '40% 0',
					width: '50%',
					objectFit: 'contain',
				}}
			/>
			<div
				ref={setRootRef}
				style={{ position: 'relative', marginTop: '58px' }}
			>
				<FloatingIndicator
					target={controlsRefs[activeRoute]}
					parent={rootRef}
					className={classes.indicator}
				/>
				{navButtons}
			</div>
		</nav>
	);
}
