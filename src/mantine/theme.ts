import { createTheme, darken, lighten, MantineTheme } from '@mantine/core';

export const mantineTheme = createTheme({
	primaryColor: 'teal',
	primaryShade: 6,
	autoContrast: true,
	defaultGradient: { from: 'teal', to: 'lime', deg: 90 },
	components: {
		Paper: {
			styles: (theme: MantineTheme) => {
				console.log(theme);
				return {
					root: {
						backgroundColor:
							localStorage.getItem(
								'mantine-color-scheme-value',
							) === 'dark'
								? lighten(theme.colors.gray[9], 0.05)
								: darken(theme.colors.gray[0], 0.05),
					},
				};
			},
		},
	},
});
