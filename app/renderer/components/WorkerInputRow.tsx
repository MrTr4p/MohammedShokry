import React, { useEffect, useState } from "react";
import { Worker } from "../typings/interfaces";
import CreateWorkerInput from "./CreateInput";

function WorkerInput({
	id,
	onChange,
}: {
	id: string;
	onChange?: (e: any) => void;
}) {
	const [workerData, setWorkerData] = useState<Worker>({
		id: id,
		cost: 0,
		date: "",
		job: "",
		name: "",
		precentage: 0,
	});
	const inputs = [
		{
			name: "name",
			title: "اسم العميل",
			placeholder: "محمد على",
			type: "text",
		},
		{
			name: "job",
			title: "الوظيفة",
			placeholder: "كهربائى",
			type: "text",
		},
		{
			name: "cost",
			title: "النسبة",
			placeholder: "0",
			type: "number",
		},
		{
			name: "date",
			title: "التاريخ",
			placeholder: "",
			type: "date",
		},
		{
			name: "precentage",
			title: "النسبة",
			placeholder: "1.22%",
			type: "number",
		},
	];

	function handleChange(e) {
		const { name, value } = e.target;
		setWorkerData((state) => ({ ...state, [name]: value }));
	}
	useEffect(() => setWorkerData((state) => ({ ...state, id: id })), [id]);
	useEffect(() => onChange(workerData), [workerData]);

	return (
		<tr className=" border-2">
			{inputs.map((input) => {
				return (
					<td>
						<CreateWorkerInput
							{...input}
							onChange={handleChange}
						></CreateWorkerInput>
					</td>
				);
			})}
		</tr>
	);
}

export default WorkerInput;
