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
				{(value / 1000000).toFixed(2)} MT
			</Text>
		);
	} else if (value > 1000) {
		return (
			<Text span c={`blue.${colorStrength || 2}`} fw="bold" {...props}>
				{(value / 1000).toFixed(2)} kT
			</Text>
		);
	} else {
		return (
			<Text span c={`green.${colorStrength || 2}`} fw="bold" {...props}>
				{value.toFixed(2)} T
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
