import { Text, type TextProps } from '@mantine/core';
// if larger than 1000, convert to kilo tonnes
// if larger than 1000000, convert to mega tonnes
export const formatTonnesColored = (
	value: number,
	colorStrength?: number,
	props?: TextProps,
) => {
	if (value > 1000000) {
		return (
			<Text span c={`orange.${colorStrength || 2}`} fw="bold" {...props}>
				{(value / 1000000).toFixed(2)} Mt
			</Text>
		);
	} else if (value > 1000) {
		return (
			<Text span c={`blue.${colorStrength || 2}`} fw="bold" {...props}>
				{(value / 1000).toFixed(2)} kt
			</Text>
		);
	} else {
		return (
			<Text span c={`green.${colorStrength || 2}`} fw="bold" {...props}>
				{value.toFixed(2)} t
			</Text>
		);
	}
};

export const stringToColor = (str: string) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	// Generate more vibrant hue
	const hue = hash % 360;
	// Use high saturation and lightness values for vibrancy
	const saturation = 90 + (hash % 10);
	const lightness = 45 + (hash % 10);

	return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const formatEmissionsPerArea = (value: number): string => {
	if (value >= 1) {
		// For larger values, show as Metric Tonnes (MT)
		return `${value.toFixed(2)} Mt/ft²`;
	} else {
		// For smaller values, convert to regular Tonnes (T)
		const tonnes = value * 1000;
		return `${tonnes.toFixed(2)} t/ft²`;
	}
};
