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
	const revenues = [
		{
			id: 1,
			amount: 200,
			date: "1/2/2022",
			projectBillId: 1,
		},
		{
			id: 2,
			amount: 140,
			date: "1/2/2020",
			projectBillId: 1,
		},
	];
	const expenses = [
		{
			id: 1,
			materialName: "كهرباء",
			date: "1/2/2022",
			totalcost: 300,
			billCode: "#12123",
			day: "friday",
			projectBillId: 1,
		},
		{
			id: 2,
			materialName: "خارصين",
			date: "2/1/2022",
			totalcost: 100,
			billCode: "#12123",
			day: "friday",
			projectBillId: 1,
		},
		{
			id: 3,
			materialName: "كهرباء",
			date: "1/2/2022",
			totalcost: 450,
			billCode: "#12123",
			day: "friday",
			projectBillId: 1,
		},
		{
			id: 4,
			materialName: "كهرباء",
			date: "1/2/2022",
			totalcost: 250,
			billCode: "#12123",
			day: "friday",
			projectBillId: 1,
		},
		{
			id: 5,
			materialName: "كهرباء",
			date: "1/4/2022",
			totalcost: 1230,
			billCode: "#12123",
			day: "friday",
			projectBillId: 1,
		},
		{
			id: 6,
			materialName: "كهرباء",
			date: "1/4/2022",
			totalcost: 320,
			billCode: "#12123",
			day: "friday",
			projectBillId: 1,
		},
		{
			id: 7,
			materialName: "خارصين",
			date: "3/1/2022",
			totalcost: 210,
			billCode: "#12123",
			day: "friday",
			projectBillId: 1,
		},
		{
			id: 8,
			materialName: "خارصين",
			date: "2/1/2022",
			totalcost: 300,
			billCode: "#12123",
			day: "friday",
			projectBillId: 1,
		},
	];
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
			adress: "customerAddress",
			projectname: "عمار للحمير",
			date: "date",
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
						<Header>شكل الفاتورة</Header>
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

				<div className="bg-base shadow-lg border  border-black p-5  rounded-md print:absolute print:inset-0">
					<div className=" divide-y-2">
						{mainInputs.map((main) => (
							<div className="mx-auto">
								<div
									key={main.name}
									className=" flex gap-4 py-4 mx-auto"
								>
									<span className="mx-auto">
										<label className="flex row font-bold text-lg">
											اسم العميل
										</label>
										{main.name}
									</span>
									<span className="mx-auto">
										<label className="flex row font-bold text-lg">
											المبلغ
										</label>
										{main.projectname}
									</span>
									<span className="mx-auto">
										<label className="flex row font-bold text-lg">
											مهنة
										</label>
										{main.adress}
									</span>
									<span className="mx-auto">
										<label className="flex row font-bold text-lg">
											التاريخ
										</label>
										{main.date}
									</span>
								</div>
							</div>
						))}
					</div>
					<div className=" divide-y-2">
						<label className=" text-2xl font-bold ">العمال</label>

						{workers.map((worker) => (
							<div className="mx-auto">
								<div
									key={worker.id}
									className=" flex gap-4 py-4 mx-auto"
								>
									<span className="font-bold flex row mt-2">
										<StarIcon className="h-2 w-2 mt-2"></StarIcon>
										{worker.id}
									</span>
									<span className="mx-auto">
										<label className="flex row font-bold text-lg">
											اسم العامل
										</label>
										{worker.workerName}
									</span>
									<span className="mx-auto">
										<label className="flex row font-bold text-lg">
											العمل
										</label>
										{worker.work}
									</span>
									<span className="mx-auto">
										<label className="flex row font-bold text-lg">
											التاريخ
										</label>
										{worker.date}
									</span>
									<span className="mx-auto">
										<label className="flex row font-bold text-lg">
											المبلغ
										</label>
										{worker.salary}
									</span>
									<span className="mx-auto">
										<label className="flex row font-bold text-lg">
											النسبة
										</label>
										{worker.precentage}
									</span>
								</div>
							</div>
						))}
					</div>
					<div className=" divide-y-2">
						<label className=" text-2xl font-bold ">
							المصروفات
						</label>

						{expenses.map((expense) => (
							<div className="mx-auto">
								<div
									key={expense.id}
									className=" flex gap-4 py-4 mx-auto"
								>
									<span className="font-bold flex row mt-2">
										<StarIcon className="h-2 w-2 mt-2"></StarIcon>
										{expense.id}
									</span>
									<span className="mx-auto">
										<label className="flex row font-bold text-lg">
											اسم المادة
										</label>
										{expense.materialName}
									</span>
									<span className="mx-auto">
										<label className="flex row font-bold text-lg">
											اليوم
										</label>
										{expense.day}
									</span>
									<span className="mx-auto">
										<label className="flex row font-bold text-lg">
											التاريخ
										</label>
										{expense.date}
									</span>
									<span className="mx-auto">
										<label className="flex row font-bold text-lg">
											المبلغ الكامل
										</label>
										{expense.totalcost}
									</span>
									<span className="mx-auto">
										<label className="flex row font-bold text-lg">
											رقم الفاتورة
										</label>
										{expense.billCode}
									</span>
								</div>
							</div>
						))}
					</div>
					<div className=" divide-y-2">
						<label className=" text-2xl font-bold ">
							ألايرادات
						</label>

						{revenues.map((revenue) => (
							<div className="mx-auto">
								<div
									key={revenue.id}
									className=" flex gap-4 py-4 mx-16"
								>
									<span className="font-bold flex row mt-2">
										<StarIcon className="h-2 w-2 mt-2"></StarIcon>
										{revenue.id}
									</span>
									<span className="mx-16">
										<label className="flex row font-bold text-lg">
											الكمية
										</label>
										{revenue.amount}
									</span>
									<span className="mx-16">
										<label className="flex row font-bold text-lg">
											التاريخ
										</label>
										{revenue.date}
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
