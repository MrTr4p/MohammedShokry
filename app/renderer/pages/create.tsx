import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CreateInput from "../components/CreateInput";
import { v4 } from "uuid";
import axios from "axios";
import CreateTable from "../components/CreateTable";
import { Bill } from "../typings/interfaces";

function Create() {
	const Header = tw.h1`text-5xl `;
	const Header4 = tw.h2`text-xl font-bold text-black`;
	const SubHeader = tw.p`text-xl text-black font-medium`;

	const [bill, setBill] = useState<Bill>({
		name: "",
		clientName: "",
		clientAddress: "",
		date: "",
		precentage: 0,
		workers: [
			{ id: 0, cost: 0, date: "", job: "", name: "", precentage: 0 },
		],
		expenses: [
			{
				id: 0,
				billCode: "",
				date: "",
				day: "",
				materialName: "",
				totalcost: 0,
			},
		],
		revenues: [{ id: 0, amount: 0, date: "" }],
	});

	useEffect(() => {
		console.log(bill);
	}, [bill]);

	async function sendBill() {}

	const mainInputs = [
		{
			name: "clientName",
			label: "أسم العميل",
			placeholder: "اكتب هنا",
			type: "text",
		},
		{
			name: "clientAddress",
			label: "عنوان العميل",
			placeholder: "اكتب هنا",
			type: "text",
		},
		{
			name: "name",
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
		{
			name: "precentage",
			label: "نسبة المكتب",
			placeholder: "1.2%",
			type: "number",
		},
	];

	const workerColumns = [
		{
			Header: "اسم العامل",
			accessor: "workerName",
			type: "text",
		},
		{
			Header: "الوظيفة",
			accessor: "workerJob",
			type: "text",
		},
		{
			Header: "المبلغ",
			accessor: "workerCost",
			type: "number",
		},
		{
			Header: "التاريخ",
			accessor: "workerDate",
			type: "date",
		},
		{
			Header: "النسبة",
			accessor: "workerPercantage",
			type: "number",
		},
		{
			Header: "مسح",
			accessor: "close",
			notInput: true,
		},
	];

	const expensesColumns = [
		{
			Header: "اسم المادة",
			accessor: "materialName",
			type: "text",
		},
		{
			Header: "اليوم",
			accessor: "day",
			type: "text",
		},
		{
			Header: "المبلغ",
			accessor: "materialCost",
			type: "number",
		},
		{
			Header: "التاريخ",
			accessor: "date",
			type: "date",
		},
		{
			Header: "كود الفاتورة",
			accessor: "billCode",
			type: "text",
		},
		{
			Header: "مسح",
			accessor: "close",
			notInput: true,
		},
	];

	const revenueColumns = [
		{
			Header: "المبلغ",
			accessor: "amount", // accessor is the "key" in the data
		},
		{
			Header: "التاريخ",
			accessor: "date",
		},
		{
			Header: "مسح",
			accessor: "close",
		},
	];

	const tables: {
		title: string;
		type: "workers" | "expenses" | "revenues";
		columnNames: any;
	}[] = [
		{ title: "العمال", type: "workers", columnNames: workerColumns },
		{ title: "المصروفات", type: "expenses", columnNames: expensesColumns },
		{ title: "الايريدات", type: "revenues", columnNames: revenueColumns },
	];

	function handleMainInputsChange(e) {
		setBill((state) => ({ ...state, [e.target.name]: e.target.value }));
	}

	function addNewRow(type: "workers" | "expenses" | "revenues") {
		setBill((state) => ({
			...state,
			[type]: [...state[type], { id: state[type].length++ }],
		}));
	}

	function editRow(type: "workers" | "expenses" | "revenues", data: any) {
		setBill((state) => ({
			...state,
			[type]: state[type].map((rowCell) => {
				if (rowCell.id == data.id) return data;
				return rowCell;
			}),
		}));
	}

	function deleteRow(type: "workers" | "expenses" | "revenues", id: number) {
		setBill((state) => ({
			...state,
			//@ts-ignore
			[type]: state[type].filter(
				(rowCell: { id: number }) => rowCell.id !== id,
			),
		}));
	}

	return (
		<>
			<Head>
				<title>Create New</title>
			</Head>
			<main className="space-y-12 my-4">
				<div className="flex items-start justify-between print:hidden">
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
				<div className="bg-base shadow-lg border border-black rounded-md  relative">
					<div className="p-4  space-y-6">
						<div className="flex items-start gap-4 ">
							{mainInputs.map((input, index) => (
								<CreateInput
									key={`main-` + index}
									name={input.name}
									onChange={handleMainInputsChange}
									{...input}
								>
									{input.label}
								</CreateInput>
							))}
						</div>

						{tables.map(({ type, title, columnNames }, index) => {
							return (
								<CreateTable
									key={index}
									title={title}
									addNewRow={addNewRow}
									deleteRow={deleteRow}
									editRow={editRow}
									type={type}
									columnNames={columnNames}
									data={bill[type]}
								></CreateTable>
							);
						})}
					</div>
					<div className="bg-secondary p-4 flex items-start gap-8">
						<div className="flex flex-col">
							<Header4>المبلغ الكلى</Header4>
							<SubHeader>392106</SubHeader>
						</div>
						<div className="flex flex-col">
							<Header4>المبلغ الكلى</Header4>
							<SubHeader>392106</SubHeader>
						</div>
						<div className="flex mt-4 justify-end flex row">
							<button
								onClick={sendBill}
								className=" justify-center outline outline-primary w-full mx-1 bg-primary drop-shadow-lg text-white text-xl font-semibold flex items-center gap-2 px-2 py-1 rounded-md hover:bg-primary/90 active:bg-primary/70 transition"
							>
								حفظ
							</button>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default Create;
