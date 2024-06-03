import type { AppState, WorkbookItem } from '@/types';
import { atom, deepMap } from 'nanostores';

export const $appState = deepMap<AppState>({
	companyName: 'Apple Co.',
	inventoryYears: [
		{
			year: '2022',
			description: 'New factory, partially closed due to covid',
		},
		{
			year: '2023',
			description: 'New factory, partially closed due to covid',
		},
	],
	facilities: [
		{
			name: 'Main',
			streetAddress: '123 Main St',
			city: 'New York',
			state: 'NY',
			zip: '10002',
			eGrid: 'RFCW',
			squareFootage: 10000,
		},
		{
			name: 'Storage',
			streetAddress: '456 Storage St',
			city: 'New York',
			state: 'NY',
			zip: '10002',
			eGrid: 'MROW',
			squareFootage: 10000,
		},
	],
});

export const $animatedRow = atom<string | null>(null);

export const $workbookItems = atom<WorkbookItem[][]>([]);
const setWorkbookItems = (items: WorkbookItem[]) => {
	const groupByYear =
		items?.reduce((acc: { [key: number]: WorkbookItem[] }, curr) => {
			const year = curr.year;
			if (!acc[year]) {
				acc[year] = [];
			}
			acc[year].push(curr);
			return acc;
		}, {}) || [];
	$workbookItems.set(Object.values(groupByYear));
};
const updateItem = (item: Partial<WorkbookItem>) => {
	const workbookItems = $workbookItems.get();
	const flatItems = workbookItems.flat();
	const oldItem = flatItems.find((i) => i.facilityId === item.facilityId);

	if (
		oldItem &&
		(Object.keys(item) as (keyof WorkbookItem)[]).every(
			(key) => item[key] === oldItem[key],
		)
	) {
		return;
	}

	$animatedRow.set(item.facilityId || null);
	setTimeout(() => $animatedRow.set(null), 1000);

	const newItems = flatItems.map((i) =>
		i.facilityId === item.facilityId ? { ...i, ...item } : i,
	);

	setWorkbookItems(newItems);
};
const addItem = (item: WorkbookItem) => {
	const year = item.year;
	const newItems = $workbookItems.get().map((row) => {
		if (row.some((i) => i.year === year)) {
			return [...row, item];
		}
		return row;
	});
	setWorkbookItems(newItems.flat());
	$animatedRow.set(item.facilityId);
};
const removeItem = (item: Partial<WorkbookItem>) => {
	const newItems = $workbookItems
		.get()
		.map((row) => row.filter((i) => i.facilityId !== item.facilityId))
		.filter((row) => row.length > 0);
	setWorkbookItems(newItems.flat());
};

export const workbook = {
	items: $workbookItems,
	setItems: setWorkbookItems,
	updateItem,
	addItem,
	removeItem,
};
