import axios from "axios";
import { GetServerSideProps } from "next";
import { Bill } from "../../typings/interfaces";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CreateInput from "../../components/CreateInput";
import { v4 } from "uuid";
import InputTable from "../../components/InputTable";

function Public({ billData }) {
	if (!billData) return "No Data";
	const Header = tw.h1`text-5xl `;
	const Header4 = tw.h2`text-xl font-bold text-black`;
	const SubHeader = tw.p`text-xl text-black font-medium`;

	const [bill, setBill] = useState<Bill>({
		...billData,
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
			accessor: "name",
			type: "text",
		},
		{
			Header: "الوظيفة",
			accessor: "job",
			type: "text",
		},
		{
			Header: "المبلغ",
			accessor: "cost",
			type: "number",
		},
		{
			Header: "التاريخ",
			accessor: "date",
			type: "date",
		},
		{
			Header: "النسبة",
			accessor: "precentage",
			type: "number",
		},
		{
			Header: "مسح",
			accessor: "close",
			close: true,
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
			accessor: "totalcost",
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
			close: true,
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
			close: true,
		},
	];

	const tables = [
		{ columns: workerColumns, title: "العاملين", type: "workers" },
		{ columns: expensesColumns, title: "المصروفات", type: "expenses" },
		{ columns: revenueColumns, title: "الايرادات", type: "revenues" },
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
							اضف فاتورة مشروع جديدة تحتوي علي عمال , ارادات و
							مصروفات
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
										value={bill[input.accessor]}
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

						{tables.map((table, index) => {
							return (
								<InputTable
									onChange={(tableState) =>
										setBill({
											...bill,
											[table.type]: tableState,
										})
									}
									columns={table.columns}
									data={bill[table.type]}
								>
									{table.title}
								</InputTable>
							);
						})}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const billName = context.query.billName as string;
	const { data } = await axios({
		url: `http://localhost:3000/bill/get/${encodeURIComponent(billName)}`,
	});
	const billData = {
		...data.bill,
		...data,
		precentage: data.bill.officePrecentage,
		workers: data.workers.map((worker) => {
			return {
				id: worker.id,
				name: worker.workerName,
				cost: worker.salary,
				job: worker.work,
				precentage: worker.precentage,
			};
		}),
	};

	delete billData.bill;

	return {
		props: {
			billData,
		}, // will be passed to the page component as props
	};
};

export default Public;
