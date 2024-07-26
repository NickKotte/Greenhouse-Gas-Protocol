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
import { $initialized, $currUser } from '@/stores/user';
import { $appState } from '@/stores/app';
import { useStore } from '@nanostores/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkbookData } from '@/api/workbook';

const routesOrdered = [{ ...routes.company }, { ...routes.administration }];

export default function DoubleNavbar() {
	const { appId } = useParams();
	useWorkbookData(appId || '');
	const windowPath = window.location.pathname;
	const route = useStore($routing);
	const appInitialized = useStore($initialized);
	const user = useStore($currUser);
	const ownedWorkbookId = user?.app_metadata?.owned_workbook_id;
	const roles = user?.app_metadata?.roles;
	const isAdmin = roles?.includes('admin');
	console.log(user?.app_metadata);
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
		const [, , main, sub] = windowPath.split('/');
		const validMainRoute = routesOrdered.find((r) => r.path === main);
		const mainroute = validMainRoute || route;
		const validSubRoute = mainroute?.links?.find(
			(link) => link.path && link.path === sub,
		);
		const subroute =
			validSubRoute || mainroute?.links?.find((link) => !!link.path);
		const newPath =
			`/${appId}/${mainroute.path}` +
			(subroute ? `/${subroute.path}` : '');
		if (windowPath !== newPath) {
			navigate(newPath);
		}
		// set the main sidebar
		setActive(routesOrdered.findIndex((r) => r.path === mainroute?.path));
		// set the nested sidebar
		$routing.set(mainroute);
		$activeLink.set(subroute?.label || mainroute?.label || null);
	}, [appInitialized, navigate, route, route.links, route.path, windowPath]);

	useEffect(() => {
		if (!appId) return;
		$appState.setKey('workbook.workbook_id', appId);
	}, [appId]);

	useEffect(() => {
		let validAppId = false;
		// const [, appId] = windowPath.split('/');
		// console.log('appId: ', appId);
		// if (appId === ownedWorkbookId) {
		// 	validAppId = true;
		// 	console.log('owned');
		// } else if (roles?.includes('admin')) {
		// 	validAppId = true;
		// 	console.log('admin');
		// } else if (user?.id && appId) {
		// 	supabaseClient //TODO: turn this into a custom hook tanstack query and cache based off workbook id
		// 		.from('user_workbook')
		// 		.select('user_id')
		// 		.eq('user_id', user.id)
		// 		.eq('workbook_id', appId)
		// 		.then(({ data }) => {
		// 			if (data && data.length > 0) {
		// 				console.log('user in workbook');
		// 				validAppId = true;
		// 			}
		// 		});
		// }
		// if (!validAppId) {
		// 	console.log('in second: ', windowPath);
		// 	navigate('/');
		// 	return;
		// }
	}, [ownedWorkbookId, user?.id]);

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

	return isAdmin ? (
		<nav className={classes.navbar}>
			<div
				ref={setRootRef}
				style={{ position: 'relative', marginTop: '73px' }}
			>
				<FloatingIndicator
					target={controlsRefs[activeRoute]}
					parent={rootRef}
					className={classes.indicator}
				/>
				{navButtons}
			</div>
		</nav>
	) : (
		<div ref={setRootRef}></div>
	);
}
