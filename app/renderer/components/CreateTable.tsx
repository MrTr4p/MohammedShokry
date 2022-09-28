import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import ExpenseInputRow from "./ExpenseInputRow";
import RevenueInputRow from "./RevenueInputRow";
import WorkerInputRow from "./WorkerInputRow";

function CreateTable({
	title,
	columnNames,
	data,
	type,
	deleteRow,
	editRow,
	addNewRow,
}: {
	title: string;
	type: "workers" | "expenses" | "revenues";
	columnNames: any;
	data: any[];
	deleteRow: Function;
	editRow: Function;
	addNewRow: Function;
}) {
	const RowComponnent =
		type === "expenses"
			? ExpenseInputRow
			: type === "revenues"
			? RevenueInputRow
			: WorkerInputRow;

	return (
		<div>
			<h1 className="font-bold text-2xl my-4">{title}</h1>
			<div className="flex flex-col items-start gap-4 w-full">
				<table className="w-full">
					<thead>
						<tr className="bg-secondary">
							{columnNames.map((column) => (
								<th
									key={column.accessor}
									className="text-start px-2"
								>
									{column.Header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data.map((revenueData, i) => {
							return (
								<RowComponnent
									index={i}
									key={revenueData.id}
									deleteRow={(id: any) => deleteRow(type, id)}
									onChange={(e) => editRow(type, e)}
									id={revenueData.id}
								></RowComponnent>
							);
						})}
					</tbody>
				</table>
				<button
					onClick={() => addNewRow(type)}
					className="bg-primary text-base border-2 w-full py-1 rounded-md hover:bg-primary/80 transition flex items-center justify-center gap-2"
				>
					<span>أضف حقلا جديدا</span>
					<PlusIcon className="h-6 w-6 text-white"></PlusIcon>
				</button>
			</div>
		</div>
	);
}

export default CreateTable;
