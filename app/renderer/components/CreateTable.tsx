import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import InputRow from "./InputRow";

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
	const RowComponnent = InputRow;

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
						{data.map((data, i) => {
							return (
								<RowComponnent
									key={i}
									inputs={columnNames}
									data={data}
									deleteRow={(id: any) => deleteRow(type, id)}
									onChange={(e) => editRow(type, e)}
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
