import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CreateInput from "../components/CreateInput";
import { v4 } from "uuid";
import axios from "axios";
import { Bill } from "../typings/interfaces";
import { useForm, SubmitHandler } from "react-hook-form";

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
			{ id: 0, cost: 945, date: "2022-06-21", job: "سباك مجارى", name: "محمد على", precentage: 5 },
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
			Header: "أسم العميل",
			accessor: "clientName",
			placeholder: "اكتب هنا",
			type: "text",
		},
		{
			accessor: "clientAddress",
			Header: "عنوان العميل",
			placeholder: "اكتب هنا",
			type: "text",
		},
		{
			accessor: "name",
			Header: "اسم المشروع",
			placeholder: "اكتب هنا",
			type: "text",
		},
		{
			accessor: "date",
			Header: "التاريخ",
			placeholder: "اكتب هنا",
			type: "date",
		},
		{
			accessor: "precentage",
			Header: "نسبة المكتب",
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
			type: "number",
		},
		{
			Header: "التاريخ",
			accessor: "date",
			type: "date",
		},
		{
			Header: "مسح",
			accessor: "close",
			notInput: true,
			width: 16,
		},
	];

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
					<div className="p-4 space-y-6">
						<div className="flex items-center">
							{mainInputs.map((input, index) => {
								return (
									<CreateInput
										key={index}
										{...input}
										onChange={(e) => {
											setBill({
												...bill,
												[input.accessor]:
													e.target.value,
											});
										}}
									>
										{input.Header}
									</CreateInput>
								);
							})}
						</div>

						<table className="w-full">
							<thead>
								<tr className="bg-secondary ">
									{workerColumns.map((tCell) => {
										return (
											<td className="p-2 rounded-t-md font-semibold">
												{tCell.Header}
											</td>
										);
									})}
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>

					<div className="bg-secondary p-4 flex items-start gap-8">
						<button
							onClick={sendBill}
							className=" justify-center outline outline-primary w-full mx-1 bg-primary drop-shadow-lg text-white text-xl font-semibold flex items-center gap-2 px-2 py-1 rounded-md hover:bg-primary/90 active:bg-primary/70 transition"
						>
							حفظ
						</button>
					</div>
				</div>
			</main>
		</>
	);
}

export default Create;
