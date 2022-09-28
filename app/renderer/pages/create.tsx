import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CreateInput from "../components/CreateInput";
import { v4 } from "uuid";
import axios from "axios";
import CreateTable from "../components/CreateTable";

function Create() {
	const Header = tw.h1`text-5xl `;
	const Header4 = tw.h2`text-xl font-bold text-black`;
	const SubHeader = tw.p`text-xl text-black font-medium`;

	const [bill, setBill] = useState({
		clientAddress: "",
		clientName: "",
		date: "",
		name: "",
		officePrecentage: 0,
		workers: [{ id: v4() }],
		expenses: [{ id: v4() }],
		revenues: [{ id: v4() }],
	});

	async function sendBill() {
		const res = await axios({
			url: `http://127.0.0.1:3000/bill/create`,
			method: "POST",
			data: {
				new: {
					bill,
				},
			},
		});
	}

	const totalCost: void = React.useMemo(() => {
		//bill.expenses.reduce()
	}, [bill]);

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
		{
			name: "officePrecentage",
			label: "نسبة المكتب",
			placeholder: "1.2%",
			type: "number",
		},
	];

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

	const expensesColumns = React.useMemo(
		() => [
			{
				Header: "اسم المادة",
				accessor: "materialName", // accessor is the "key" in the data
			},
			{
				Header: "اليوم",
				accessor: "day",
			},
			{
				Header: "المبلغ",
				accessor: "materialCost",
			},
			{
				Header: "التاريخ",
				accessor: "materialDate",
			},
			{
				Header: "كود الفاتورة",
				accessor: "billCode",
			},
			{
				Header: "مسح",
				accessor: "close",
			},
		],
		[],
	);

	const revenueColumns = React.useMemo(
		() => [
			{
				Header: "المبلغ",
				accessor: "amount", // accessor is the "key" in the data
			},
			{
				Header: "اليوم",
				accessor: "day",
			},
			{
				Header: "التاريخ",
				accessor: "materialDate",
			},
			{
				Header: "مسح",
				accessor: "close",
			},
		],
		[],
	);

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
			[type]: [...state[type], { id: v4() }],
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

	function deleteRow(type: "workers" | "expenses" | "revenues", id: string) {
		setBill((state) => ({
			...state,
			[type]: state[type].filter((rowCell) => rowCell.id !== id),
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
					</div>
				</div>
			</main>
		</>
	);
}

export default Create;
