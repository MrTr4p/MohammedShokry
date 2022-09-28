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
import { createPopper } from "@popperjs/core";
import DropDown from "../components/DropDown";

function Home({
	homeBills,
	billsType,
}: {
	homeBills: any[];
	billsType: "public" | "office";
}) {
	const Header = tw.h1`text-5xl font-bold text-black`;
	const SubHeader = tw.h1`text-xl text-black`;
	const [open, setOpen] = useState(false);

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<main className="space-y-12">
				<div className="flex justify-between items-start">
					<div className="flex flex-col items-start gap-2">
						<Header>الفاتورة</Header>
						<SubHeader>ارجو اتاكد قبل طباعة الفاتورة</SubHeader>
					</div>
					<div>
						<div className="flex row">
							<button
								onClick={() => {
									setOpen(!open);
								}}
								className=" relative bg-primary drop-shadow-lg text-white text-2xl font-semibold flex items-center gap-2 px-4 py-2 rounded-md hover:bg-primary/80 active:bg-primary transition"
							>
								اختار طريقة الطباعة
								<ChevronDownIcon className="mt-1 w-8 h-8"></ChevronDownIcon>
								<AnimatePresence>
									{open && (
										<DropDown
											open={!open}
											setOpen={setOpen}
										/>
									)}
								</AnimatePresence>
							</button>
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
						<span className="font-bold text-2xl ">العاملين</span>
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
	const { billName } = context.query;
	return {
		props: {}, // will be passed to the page component as props
	};
};
export default Home;
