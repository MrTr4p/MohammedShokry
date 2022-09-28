import { TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import CreateWorkerInput from "./CreateInput";

function InputRow({
	data,
	onChange,
	deleteRow,
	inputs,
}: {
	inputs: any;
	data: any;
	onChange?: (e: any) => void;
	deleteRow?: (e: any) => void;
}) {
	const [cellData, setCellData] = useState({ ...data });
	useEffect(() => onChange(cellData), [cellData]);

	function handleChange(e) {
		const { name, value } = e.target;
		setCellData((state) => ({ ...state, [name]: value }));
	}

	return (
		<tr className="border-2">
			{inputs.map((input, i) => {
				if (input.notInput) return;
				return (
					<td key={input.id}>
						<CreateWorkerInput
							{...input}
							onChange={handleChange}
						></CreateWorkerInput>
					</td>
				);
			})}

			<td className="text-center text-base w-8">
				<button
					onClick={() => deleteRow(cellData.id)}
					className="p-2 bg-red-500 hover:bg-red-600 mt-1.5 rounded-md transition disabled:bg-red-400"
				>
					<TrashIcon className="w-6 h-6 stroke-2"></TrashIcon>
				</button>
			</td>
		</tr>
	);
}

export default InputRow;
