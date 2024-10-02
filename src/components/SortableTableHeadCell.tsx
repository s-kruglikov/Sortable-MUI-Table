import { TableCell } from '@mui/material';
import { ReactElement } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


interface SortableTableHeadCellProps {
	id: string,
	children: ReactElement | string
}

export const SortableTableHeadCell = ({ id, children }: SortableTableHeadCellProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		cursor: 'grab'
	};

	return (
		<TableCell
			id={id}
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}>
			{children}
		</TableCell>
	);
}