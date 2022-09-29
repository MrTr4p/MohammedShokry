import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function InputTableRow({
	columns,
	data,
	onChange,
	removeRow,
	index,
}) {
	const [rowState, setRowState] = useState<any>({ ...data });
	useEffect(() => onChange(rowState), [rowState]);
	return (
		<motion.tr
			exit={{ opacity: 0 }}
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ ease: "easeInOut", duration: 0.2, bounce: 1 }}
		>
			{columns.map((column) => {
				if (column.close)
					return (
						<td className="w-8" key={data.id + "mom"} role={"cell"}>
							<button
								
								onClick={() => removeRow(data.id)}
								className="bg-red-600 flex justify-center w-full hover:bg-red-500 disabled:bg-red-400 p-2 rounded transition"
							>
								<TrashIcon className="text-base w-6 h-6"></TrashIcon>
							</button>
						</td>
					);

				return (
					<td className="" role={"cell"}>
						<input
							type={column.type}
							placeholder={column.placeholder || column.Header}
							value={rowState[column.accessor]}
							onChange={(e) =>
								setRowState({
									...rowState,
									[column.accessor]: e.target.value,
								})
							}
							className="border border-dashed p-2 bg-base border-black focus:outline-primary rounded-md w-full print:border-0 h-10 px-2"
						/>
					</td>
				);
			})}
		</motion.tr>
	);
}
