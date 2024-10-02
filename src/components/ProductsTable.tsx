import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow
} from "@mui/material"
import { Product } from "../types/Product";
import { SortableTableHead } from "./SortableTableHead";
import { useEffect, useState } from "react";
import TableColumn from '../types/TableColumn'

export const ProductsTable = () => {
	const productsData: Array<Product> = [
		{ name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
		{ name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
		{ name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
		{ name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
		{ name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
	];

	const initialColumns: Array<TableColumn> = [
		{ id: '1', key: 'name', name: 'Dessert (100g serving)' },
		{ id: '2', key: 'calories', name: 'Calories' },
		{ id: '3', key: 'fat', name: 'Fat (g)' },
		{ id: '4', key: 'carbs', name: 'Carbs (g)' },
		{ id: '5', key: 'protein', name: 'Protein (g)' },
	]

	const getOrderedRows = (columnsParam: TableColumn[]) => productsData.map((product: Product) => {
		let row = {};

		columnsParam.map((column) => {
			row = ({...row, [column.key]: product[column.key]});
		})

		return row as Product;
	});

	const [columns, setColumns] = useState(initialColumns);
	const [rows, setRows] = useState(getOrderedRows(initialColumns));

	const onColumnMove = (orderedColumns: TableColumn[]) => {
		setColumns(orderedColumns);
	}

	useEffect(() => {
		setRows(getOrderedRows(columns));
	}, [columns]);

	return (
		<TableContainer component={Paper}>
			<Table>
				<SortableTableHead columns={columns} onColumnMove={onColumnMove}/>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.name}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							{
								columns.map(column => {
									return <TableCell>{row[column.key]}</TableCell>
								})
							}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>

	);
}