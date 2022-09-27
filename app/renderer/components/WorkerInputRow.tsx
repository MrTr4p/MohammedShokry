import React, { useEffect, useState } from "react";
import { Worker } from "../typings/interfaces";
import CreateWorkerInput from "./CreateInput";

function WorkerInput({ id, onChange }: { id: string, onChange: (e: any) => void }) {
	const [workerData, setWorkerData] = useState<Worker>({
		id: id,
		cost: 0,
		date: "",
		job: "",
		name: "",
		precentage: 0,
	});
	useEffect(() => setWorkerData((state) => ({ ...state, id: id })), [id]);
	const inputs = [
		{
			accessor: "name",
			title: "اسم العميل",
			placeholder: "محمد على",
			type: "text",
		},
		{
			accessor: "job",
			title: "الوظيفة",
			placeholder: "كهربائى",
			type: "text",
		},
		{
			accessor: "cost",
			title: "النسبة",
			placeholder: "0",
			type: "number",
		},
		{
			accessor: "date",
			title: "التاريخ",
			placeholder: "",
			type: "date",
		},
		{
			accessor: "precentage",
			title: "النسبة",
			placeholder: "1.22%",
			type: "number",
		},
	];

	function handleChange(e) {
		const { accessor, value } = e.target;
		setWorkerData((state) => ({ ...state, [accessor]: value }));
	}

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
