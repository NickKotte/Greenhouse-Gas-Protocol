import { useStore } from '@nanostores/react';
import { $routing, $activeLink } from '@/stores/route';
import { Outlet } from 'react-router-dom';
import { Box, Divider } from '@mantine/core';
import classes from '@/css/DoubleNavbar.module.css';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NestedSideNav = () => {
	const navigate = useNavigate();
	const ref = useRef<HTMLDivElement>(null);
	const route = useStore($routing);
	const activeLink = useStore($activeLink);

	const links =
		route?.links?.map((link) => {
			if (link.path)
				return (
					<a
						className={classes.link}
						data-active={activeLink === link.label || undefined}
						onClick={(event) => {
							if (link.label === activeLink) return;
							event.preventDefault();
							$activeLink.set(link);
							link.path && navigate(`${route.path}/${link.path}`);
						}}
						key={link.label}
					>
						{link.icon && (
							<link.icon style={{ marginRight: '10px' }} />
						)}
						{link.label}
					</a>
				);
			else
				return (
					<Box mb="10px" w="100%" key={link.label}>
						<Divider
							my="xs"
							label={link.label}
							labelPosition="center"
							ml="10px"
						/>
					</Box>
				);
		}) || [];

	return (
		<main
			style={{
				flex: 1,
				display: 'flex',
				height: '100%',
			}}
		>
			{links.length ? (
				<motion.div
					initial={{ width: ref.current?.offsetWidth || 0 }}
					animate={{ width: 'auto' }}
					transition={{ duration: 0.3 }}
					key={route.label}
				>
					<Box
						className={classes.aside}
						ref={ref}
						style={{
							paddingRight: links.length ? '20px' : '0px',
						}}
					>
						{links}
					</Box>
				</motion.div>
			) : (
				<motion.div
					initial={{ width: 100 }}
					animate={{ width: 0 }}
					transition={{ duration: 0.2 }}
					key={route.label}
				>
					<Box
						className={classes.aside}
						style={{ paddingRight: '0px' }}
					>
						{links}
					</Box>
				</motion.div>
			)}
			<Box m="20px">
				<Outlet />
			</Box>
		</main>
	);
};

export default NestedSideNav;
