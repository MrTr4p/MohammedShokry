import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import CreateInput from "../components/CreateInput";
import { Worker } from "../typings/interfaces";
import { useTable } from "react-table";

function Preview() {
	const Header = tw.h1`text-5xl font-bold text-black`;
	const Header2 = tw.h2`text-3xl font-bold text-black`;
	const SubHeader = tw.p`text-xl text-black`;
	const [bill, setBill] = useState({
		customerAddress: "",
		customerName: "",
		date: "",
		projectName: "",
		workers: [],
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
		],
		[],
	);

	const workersData = [
		{
			workerName: "احمد",
			workerJob: "كهربالئى",
			workerCost: 5931,
			workerDate: "2/12/2019",
			workerPercantage: 5,
		},
	];

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

	const tableInstance = useTable({
		columns: workerColumns as any,
		data: workersData,
	});

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance;

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
				<div className="bg-base shadow-lg border border-black p-4 rounded-md space-y-6 divide-y-2">
					<div className="flex row">
						<Preview />
					</div>
				</div>
			</main>
		</>
	);
}

export default Preview;
