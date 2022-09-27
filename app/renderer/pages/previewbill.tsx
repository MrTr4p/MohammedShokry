import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import CreateInput from "../components/CreateInput";
import { Worker } from "../typings/interfaces";
import { useTable } from "react-table";

function preview() {
	const Header = tw.h1`text-5xl font-bold text-black`;
	const Header2 = tw.h2`text-3xl font-bold text-black`;
	const SubHeader = tw.p`text-xl text-black`;

	const workers = [
		{
			id: "1",
			workerName: "محمد",
			salary: "200",
			precentage: "12",
			salaryPrecentage: "24",
			date: "1/2/2022",
			work: "كهرباء",
			projectName: "عمار للحمير",
			projectId: "1",
		},
		{
			id: "2",
			workerName: "احمد",
			salary: 200,
			precentage: 12,
			salaryPrecentage: 24,
			date: "1/2/2022",
			work: "سلكيات",
			projectName: "عمار للحمير",
			projectId: 1,
		},
	];

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
				<div className ='mx-auto'>
				<div className="bg-base shadow-lg border   border-black p-4  rounded-md divide-y-2">
					{workers.map((worker) => (
					<div className ='mx-auto'>
							<div
							key={worker.id}
							className=" flex gap-4 py-4 mx-auto"
						>
							<span className="font-bold flex row mt-2">
								<StarIcon className ='h-4 w-4 mt-2'></StarIcon>
								{worker.id}
							</span>
							<span className="mx-auto">
								<label className="flex row font-bold text-lg">
									اسم العامل
								</label>
								{worker.workerName}
							</span>
							<span className="mx-auto">
								<label className="flex row font-bold text-kg">
									مهنة
								</label>
								{worker.work}
							</span>
							<span className="mx-auto">
								<label className="flex row font-bold text-kg">
									التاريخ
								</label>
								{worker.date}
							</span>
							<span className="mx-auto">
								<label className="flex row font-bold text-kg">
									المبلغ
								</label>
								{worker.salary}
							</span>
							<span className="mx-auto">
								<label className="flex row font-bold text-kg">
									نسبة
								</label>
								{worker.precentage}
							</span>
						</div>
						</div>
					))}
				</div>
				</div>
			</main>
		</>
	);
}

export default preview;
