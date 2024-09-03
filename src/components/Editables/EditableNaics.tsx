import EditableWrapper from './EditableWrapper';
import { useEffect, useState } from 'react';
import NaicsSelector from '../NaicsSelector';
import { IconCaretRightFilled } from '@tabler/icons-react';

export const EditableNaics = ({
	value,
	onDoneEditing,
}: {
	value: string;
	onDoneEditing: (value: string) => void;
}) => {
	const [localValue, setLocalValue] = useState(value);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);
	return (
		<EditableWrapper
			displayValue={value}
			leftIcon={IconCaretRightFilled}
			label={`NAICS Code`}
			onDoneEditing={() => onDoneEditing(localValue)}
		>
			<NaicsSelector
				value={localValue}
				onChange={(value) => {
					setLocalValue(value);
				}}
			/>
		</EditableWrapper>
	);
};
