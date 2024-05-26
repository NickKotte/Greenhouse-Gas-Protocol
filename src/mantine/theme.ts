import { createTheme, darken, lighten, MantineTheme } from '@mantine/core';

export const mantineTheme = createTheme({
	primaryColor: 'teal',
	primaryShade: 6,
	autoContrast: true,
	defaultGradient: { from: 'teal', to: 'lime', deg: 90 },
	fontFamily: 'Roboto, sans-serif',
	components: {
		Paper: {
			styles: (theme: MantineTheme) => {
				return {
					root: {
						backgroundColor:
							localStorage.getItem(
								'mantine-color-scheme-value',
							) === 'dark'
								? lighten('var(--mantine-color-body)', 0.03)
								: darken('var(--mantine-color-body)', 0.04),
					},
				};
			},
		},
	},
});
