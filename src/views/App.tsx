import { Container, Title, Text, Button } from '@mantine/core';
import classes from '@/css/HeroImageRight.module.css';
import { useNavigate } from 'react-router-dom';
import { $currUser } from '@/stores/user';
import { routes } from '@/stores/route';
import { useStore } from '@nanostores/react';
import { useCallback, useEffect } from 'react';

export default function HeroImageRight() {
	const navigate = useNavigate();
	const user = useStore($currUser);

	return (
		<div className={classes.root}>
			<Container size="lg">
				<div className={classes.content}>
					<Title size={50} fw={900} style={{ color: 'white' }}>
						Unlock the Power of{' '}
						<Text component="span" inherit variant="gradient">
							Green Manufacturing
						</Text>
					</Title>

					<Text
						style={{ color: 'lightgrey', lineHeight: '2' }}
						mt={20}
						maw={700}
					>
						Whether you're a small-scale producer or a large-scale
						manufacturer, our Greener Factory Toolkit scales with
						you. Start your journey towards a more sustainable
						future today and gain a competitive edge in an
						increasingly eco-conscious market.
					</Text>

					<Button
						variant="gradient"
						gradient={{ from: 'green', to: 'teal' }}
						size="xl"
						className={classes.control}
						mt={40}
						onClick={() => navigate('/login')}
					>
						{user ? 'Open my workbook' : 'Get Started'}
					</Button>
				</div>
			</Container>
		</div>
	);
}