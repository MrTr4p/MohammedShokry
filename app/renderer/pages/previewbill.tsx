import React, { useState } from "react";
import Head from "next/head";
import tw from "tailwind-styled-components";
import { PlusIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Modal from "../components/Modal";
import { AnimatePresence } from "framer-motion";
import { GetServerSideProps } from "next";
import { useTable } from "react-table";
import DropDown from "../components/DropDown";
import AggBill from "../components/AggBill";
import WorkerBill from '../components/WorkerBill'

function Home({ billData, }) {
	const Header = tw.h1`text-5xl font-bold text-black`;
	const SubHeader = tw.h1`text-xl text-black`;
	const [open, setOpen] = useState(false);
	const [data, setdata] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [modal2Open, setModal2Open] = useState(false);


	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<main className="space-y-12">
				<div className="flex justify-between items-start">
					<div className="flex flex-col items-start gap-2">
						<Header>اطبع الفاتورة</Header>
						<SubHeader>ارجو التاكد قبل طباعة الفاتورة</SubHeader>
					</div>
					<div>
						<div className="flex row">
							<button
							
							className="w-3/5 mx-4 bg-white outline outine-1 outine-primary text-primary text-sm font-semibold flex items-center gap-2 px-4 py-1 rounded-md hover:bg-primary/10 active:bg-primary/20 transition">
								<span className="flex row mx-auto">
									  طبع فاتورة مجمعية 
								</span>
							</button>
							
							<button
							onClick={() => {
								setModalOpen(true);
							}}
							 className=" w-3/5 mx-4 bg-white outline outine-1 outine-primary text-primary text-sm font-semibold flex items-center gap-2 px-4 py-1 rounded-md hover:bg-primary/10 active:bg-primary/20 transition">
								<span className="mx-auto">طبع فاتورة تفصيلية </span>
							</button>
							<AnimatePresence>
								{modalOpen && (
									<AggBill setOpenModal={setModalOpen} />
								)}
							</AnimatePresence>
							<button
							onClick={() => {
								setModal2Open(true);
							}}
							className="w-3/5 mx-4 bg-white outline outine-1 outine-primary text-primary text-sm font-semibold flex items-center gap-2 px-4 py-1 rounded-md hover:bg-primary/10 active:bg-primary/20 transition">
								<span className="mx-auto"> طبع فاتورة عامل</span>
							</button>
							<AnimatePresence>
								{modal2Open && (
									<WorkerBill setOpenModal2={setModal2Open} />
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
				<table className="outline outline-1 w-full">
					<thead className="bg-secondary h-8">
						<tr>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="h-12 border-2 rounded"></td>
						</tr>
					</tbody>
					<div className="justify-start flex row mx-4">
						<span className="font-bold text-2xl ">العمال</span>
					</div>
					<thead className="bg-secondary h-8">
						<tr>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="h-12 border-2 rounded"></td>
						</tr>
					</tbody>
					<div className="justify-start flex row mx-4">
						<span className="font-bold text-2xl ">المصروفات</span>
					</div>
					<thead className="bg-secondary h-8">
						<tr>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="h-12 border-2 rounded"></td>
						</tr>
					</tbody>
					<div className="justify-start flex row mx-4">
						<span className="font-bold text-2xl ">الايرادات</span>
					</div>
					<thead className="bg-secondary h-8">
						<tr>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="h-12 border-2 rounded"></td>
						</tr>
					</tbody>
				</table>
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

export default Home;
