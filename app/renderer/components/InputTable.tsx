import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 } from "uuid";
import { Expense, Revenue, Worker } from "../typings/interfaces";
import InputTableRow from "./InputTableRow";
import tw from "tailwind-styled-components";
import { motion, AnimatePresence } from "framer-motion";

function InputTable({
	columns,
	data,
	onChange,
	children,
}: {
	columns: any;
	data: Worker[] | Revenue[] | Expense[];
	onChange: (tableState: any) => void;
	children?: any;
}) {
	const [tableState, setTableState] = useState<any>(data);
	useEffect(() => onChange(tableState), [tableState]);

	function addNewRow() {
		setTableState((state) => [...state, { id: v4() }]);
	}

	function removeRow(id: string | number) {
		setTableState((state) => state.filter((row) => row.id !== id));
	}

	return (
		<motion.div className="flex flex-col items-start space-y-4">
			<h4 className="text-xl font-bold text-black">{children}</h4>
			<table className="w-full" cellPadding={5}>
				<thead>
					<tr className="bg-secondary rounded-md">
						{columns.map((tCell, i) => {
							return (
								<th
									key={i}
									className={`py-2 text-start px-1 font-semibold`}
								>
									{tCell.Header}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<AnimatePresence>
						{tableState.map(
							(row: Worker | Revenue | Expense, i) => {
								return (
									<InputTableRow
										index={i}
										key={row.id}
										columns={columns}
										data={row}
										removeRow={removeRow}
										onChange={(rowData) => {
											setTableState(
												tableState.map((row) => {
													if (row.id == rowData.id)
														return rowData;
													return row;
												}),
											);
										}}
									></InputTableRow>
								);
							},
						)}
					</AnimatePresence>
				</tbody>
			</table>
			<div className="px-2 w-full">
				<button
					onClick={addNewRow}
					className=" justify-center outline outline-primary w-full  text-primary bg-base drop-shadow-lg text-xl font-semibold flex items-center gap-2  py-1 rounded-md hover:bg-primary/10 active:bg-primary/5 transition"
				>
					أضف حقلا جديدا
				</button>
			</div>
		</motion.div>
	);
}

export default InputTable;
