import { TableHead, TableRow } from "@mui/material"
import { SortableTableHeadCell } from "./SortableTableHeadCell";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import {
	arrayMove,
	horizontalListSortingStrategy,
	SortableContext,
	sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { useEffect, useState } from "react";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import TableColumn from "../types/TableColumn";

interface SortableTableHeadProps {
	columns: Array<TableColumn>,
	onColumnMove: (columns: TableColumn[]) => void
}

export const SortableTableHead = ({columns, onColumnMove}: SortableTableHeadProps) => {
	const [items, setItems] = useState(columns);
	const sensors = useSensors(
		useSensor(PointerSensor,{
			activationConstraint: {
				delay: 300,
				tolerance: 5
			}
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	
	function handleDragEnd(event: { active: any; over: any; }) {
		const { active, over } = event;

		if (active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.map(m => m.id).indexOf(active.id);
				const newIndex = items.map(m => m.id).indexOf(over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}

	useEffect(() => {
		onColumnMove(items);
		console.log(items);
	}, [items]);

	return (
		<TableHead>
			<TableRow>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
					modifiers={[restrictToHorizontalAxis]}
				>
					<SortableContext
						items={items}
						strategy={horizontalListSortingStrategy}
					>
						{items.map((item, index) =>
							<SortableTableHeadCell id={item.id} key={index}>
								{item.name}
							</SortableTableHeadCell>
						)}
					</SortableContext>
				</DndContext>
			</TableRow>
		</TableHead>
	);
}