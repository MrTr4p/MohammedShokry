import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import CreateInput from "../components/CreateInput";
import { Worker } from "../typings/interfaces";
import { useTable } from "react-table";
import WorkerInputRow from "../components/WorkerInputRow";
import { v4 } from "uuid";
import { PlusIcon } from "@heroicons/react/24/outline";

function Create() {
	const Header = tw.h1`text-5xl font-bold text-black`;
	const Header2 = tw.h2`text-3xl font-bold text-black`;
	const SubHeader = tw.p`text-xl text-black`;
	const [bill, setBill] = useState({
		customerAddress: "",
		customerName: "",
		date: "",
		projectName: "",
		workers: [{ id: v4() }],
		expenses: [],
	});

	const workerColumns = React.useMemo(
		() => [
			{
				Header: "اسم العامل",
				accessor: "workerName", // accessor is the "key" in the data
			},
			{
				Header: "الوظيفة",
				accessor: "workerJob",
			},
			{
				Header: "المبلغ",
				accessor: "workerCost",
			},
			{
				Header: "التاريخ",
				accessor: "workerDate",
			},
			{
				Header: "النسبة",
				accessor: "workerPercantage",
			},
			{
				Header: "مسح",
				accessor: "close",
			},
		],
		[],
	);

	useEffect(() => {
		console.log(bill);
	}, [bill]);

	const mainInputs = [
		{
			name: "customerName",
			label: "أسم العميل",
			placeholder: "اكتب هنا",
			type: "text",
		},
		{
			name: "customerAddress",
			label: "عنوان العميل",
			placeholder: "اكتب هنا",
			type: "text",
		},
		{
			name: "projectName",
			label: "اسم المشروع",
			placeholder: "اكتب هنا",
			type: "text",
		},
		{
			name: "date",
			label: "التاريخ",
			placeholder: "اكتب هنا",
			type: "date",
		},
	];

	function handleMainInputsChange(e) {
		setBill((state) => ({ ...state, [e.target.name]: e.target.value }));
	}
	function addNewWorkerRow() {
		setBill((state) => ({
			...state,
			workers: [...state.workers, { id: v4() }],
		}));
	}

	function editWorkerRow(data: any) {
		setBill((state) => ({
			...state,
			workers: state.workers.map((worker) => {
				if (worker.id == data.id) return data;
				return worker;
			}),
		}));
	}

	function deleteWorkerRow(id: string) {
		setBill((state) => ({
			...state,
			workers: state.workers.filter((workerRow) => workerRow.id !== id),
		}));
	}

	return (
		<>
			<Head>
				<title>Create New</title>
			</Head>
			<main className="space-y-12">
				<div className="flex justify-between items-start print:hidden">
					<div className="flex flex-col items-start gap-2">
						<Header>أضافة فاتورة جديدة</Header>
						<SubHeader>
							كلام
							كتيييييييييييييييييييييييييييييييييييييييييييييييييييير
						</SubHeader>
					</div>

					<Link href="/">
						<a>
							<button className="z-0 bg-white drop-shadow-lg text-primary border-primary border-2 text-2xl font-semibold flex items-center gap-2 px-4 py-2 rounded-md hover:bg-primary/5 active:bg-primary/10 transition">
								<span>الغاء</span>
								<XMarkIcon className="h-8 w-8"></XMarkIcon>
							</button>
						</a>
					</Link>
				</div>
				<div className="bg-base shadow-lg border border-black p-4 rounded-md space-y-6">
					<div className="flex items-start gap-4">
						{mainInputs.map((input, index) => (
							<CreateInput
								key={`main-` + index}
								onChange={handleMainInputsChange}
								{...input}
							>
								{input.label}
							</CreateInput>
						))}
					</div>
					<div>
						<h1 className="font-bold text-2xl my-4">العاملين</h1>
						<div className="flex flex-col items-start gap-4 w-full">
							<table className="w-full">
								<thead>
									<tr className="bg-secondary">
										{workerColumns.map((column) => (
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
									{bill.workers.map((workerData) => {
										return (
											<WorkerInputRow
												key={workerData.id}
												deleteRow={deleteWorkerRow}
												onChange={(e) =>
													editWorkerRow(e)
												}
												id={workerData.id}
											></WorkerInputRow>
										);
									})}
								</tbody>
							</table>
							<button
								onClick={addNewWorkerRow}
								className="bg-primary text-base border-2 w-full py-1 rounded-md hover:bg-primary/80 transition flex items-center justify-center gap-2"
							>
								<span>أضف عاملا جديدا</span>
								<PlusIcon className="h-6 w-6 text-white"></PlusIcon>
							</button>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default Create;
