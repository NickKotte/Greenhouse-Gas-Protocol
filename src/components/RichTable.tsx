import {
	Table,
	Checkbox,
	ScrollArea,
	Group,
	Avatar,
	Text,
	rem,
	UnstyledButton,
	Center,
	TextInput,
	ActionIcon,
	Box,
	Drawer,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import cx from 'clsx';
import classes from '@/css/TableSelection.module.css';
import { useState, useMemo } from 'react';
import {
	IconChevronUp,
	IconChevronDown,
	IconSelector,
	IconSearch,
	IconX,
	IconLayoutSidebarLeftExpand,
	IconUser,
} from '@tabler/icons-react';
import { useStore } from '@nanostores/react';
import { $currUser } from '@/stores/user';

interface RowData {
	id: string;
	[key: string]: string;
}

interface ThProps {
	children: React.ReactNode;
	reversed: boolean;
	sorted: boolean;
	onSort(): void;
}

interface TableSelectionProps {
	data: RowData[];
	headers: {
		key: string;
		label: string;
		sortable?: boolean;
		render?: (value: string, row: RowData) => React.ReactNode;
	}[];
	DrawerElement: React.FC<{ data: RowData }>;
	selection: string[];
	setSelection: React.Dispatch<React.SetStateAction<string[]>>;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
	const Icon = sorted
		? reversed
			? IconChevronUp
			: IconChevronDown
		: IconSelector;
	return (
		<Table.Th className={classes.th}>
			<UnstyledButton onClick={onSort} className={classes.control}>
				<Group justify="space-between">
					<Text fw={500} fz="sm">
						{children}
					</Text>
					<Center className={classes.icon}>
						<Icon
							style={{ width: rem(16), height: rem(16) }}
							stroke={1.5}
						/>
					</Center>
				</Group>
			</UnstyledButton>
		</Table.Th>
	);
}

function filterData(data: RowData[], search: string, selectedIds: string[]) {
	const query = search.toLowerCase().trim();
	return data.filter(
		(item) =>
			selectedIds.includes(item.id) ||
			Object.values(item).some((value) =>
				value.toLowerCase().includes(query),
			),
	);
}

function sortData(
	data: RowData[],
	payload: {
		sortBy: string | null;
		reversed: boolean;
		search: string;
	},
	selectedIds: string[],
) {
	const { sortBy } = payload;

	if (!sortBy) {
		return filterData(data, payload.search, selectedIds);
	}

	return filterData(
		[...data].sort((a, b) => {
			if (payload.reversed) {
				return b[sortBy].localeCompare(a[sortBy]);
			}
			return a[sortBy].localeCompare(b[sortBy]);
		}),
		payload.search,
		selectedIds,
	);
}

export default function RichTable({
	data = [],
	headers,
	DrawerElement,
	selection,
	setSelection,
}: TableSelectionProps) {
	const [search, setSearch] = useState('');
	const [sortBy, setSortBy] = useState<string | null>(null);
	const [reverseSortDirection, setReverseSortDirection] = useState(false);
	const [drawerItem, setDrawerItem] = useState<RowData | null>(null);
	const [opened, { open, close }] = useDisclosure(false);
	const admin = useStore($currUser);

	const setSorting = (field: string) => {
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		setSearch(value);
	};

	const clearSearch = () => {
		setSearch('');
	};

	const toggleRow = (id: string) => {
		setSelection((current: string[]) => {
			return current.includes(id)
				? current.filter((item) => item !== id)
				: [...current, id];
		});
	};
	const toggleAll = () =>
		setSelection((current) =>
			current.length === data.length - 1
				? []
				: data.map((item) => item.id).filter((id) => id !== admin?.id),
		);

	const sortedData = useMemo(() => {
		return sortData(
			data,
			{
				sortBy,
				reversed: reverseSortDirection,
				search,
			},
			selection,
		);
	}, [data, sortBy, reverseSortDirection, search, selection]);
	const rows = useMemo(() => {
		return sortedData.map((item) => {
			const selected = selection.includes(item.id);
			const isSameUser = item.id === admin?.id;
			return (
				<Table.Tr
					key={item.id}
					className={cx({ [classes.rowSelected]: selected })}
				>
					<Table.Td>
						{!isSameUser ? (
							<Checkbox
								checked={selection.includes(item.id)}
								onChange={() => toggleRow(item.id)}
							/>
						) : (
							<Center>
								<IconUser color="gray" />
							</Center>
						)}
					</Table.Td>
					<Table.Td style={{ width: '1%' }}>
						<Center>
							<ActionIcon
								size="sm"
								variant="transparent"
								color="gray"
								className="hover-visible"
								onClick={() => {
									open();
									setDrawerItem(item);
								}}
							>
								<IconLayoutSidebarLeftExpand />
							</ActionIcon>
						</Center>
					</Table.Td>
					<Table.Td style={{ width: '1%' }}>
						<Avatar radius={26} color={item.color}>
							{item.email.slice(0, 2).toUpperCase()}
						</Avatar>
					</Table.Td>
					{headers.map((header) => (
						<Table.Td key={header.key}>
							{header.render
								? header.render(item[header.key], item)
								: item[header.key]}
						</Table.Td>
					))}
				</Table.Tr>
			);
		});
	}, [sortedData, selection, headers]);

	if (data.length === 0) {
		return (
			<Center>
				<Text>No data found</Text>
			</Center>
		);
	}
	return (
		<Box>
			<ScrollArea>
				<TextInput
					radius="md"
					placeholder="Search by any field"
					mb="md"
					leftSection={
						<IconSearch
							style={{ width: rem(16), height: rem(16) }}
							stroke={1.5}
						/>
					}
					rightSection={
						search && (
							<ActionIcon
								onClick={clearSearch}
								size="sm"
								radius="md"
								variant="subtle"
								color="gray"
							>
								<IconX />
							</ActionIcon>
						)
					}
					value={search}
					onChange={handleSearchChange}
				/>
				<Table miw={800} verticalSpacing="sm">
					<Table.Thead>
						<Table.Tr>
							<Table.Th style={{ width: rem(40) }}>
								<Checkbox
									onChange={toggleAll}
									checked={selection.length === data.length}
									indeterminate={
										selection.length > 0 &&
										selection.length !== data.length
									}
								/>
							</Table.Th>
							<Table.Th></Table.Th>
							<Table.Th></Table.Th>
							{headers.map((header) => (
								<Th
									key={header.key}
									reversed={reverseSortDirection}
									sorted={sortBy === header.key}
									onSort={() => setSorting(header.key)}
								>
									{header.label}
								</Th>
							))}
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</ScrollArea>
			<Drawer
				opened={opened}
				onClose={close}
				position="right"
				withCloseButton={false}
				offset="8px"
				radius="md"
				size="550px"
			>
				{drawerItem && <DrawerElement data={drawerItem} />}
			</Drawer>
		</Box>
	);
}
function useGetUsers(): { refetch: any } {
	throw new Error('Function not implemented.');
}
