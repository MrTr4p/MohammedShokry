import React, { useState } from "react";
import Head from "next/head";
import tw from "tailwind-styled-components";
import { PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Modal from "../components/Modal";
import { AnimatePresence, motion } from "framer-motion";
import { GetServerSideProps } from "next";
import { useTable } from "react-table";

function Home({ homeBills }: { homeBills: any[] }) {
	const Header = tw.h1`text-5xl font-bold text-black`;
	const SubHeader = tw.h1`text-xl text-black`;
	const [modalOpen, setModalOpen] = useState(false);
	const homeBillsData = React.useMemo(() => homeBills, []);
	const homeBillsColumn = React.useMemo(
		() => [
			{ Header: "رقم الفاتورة", accessor: "id" },
			{ Header: "التاريخ", accessor: "date" },
			{ Header: "عدد العمال", accessor: "workersCount" },
			{ Header: "السعر الكلى", accessor: "totalCost" },
			//{ Header: "سعر الفاتورة", accessor: "billCost" },
		],
		[],
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns: homeBillsColumn,
			data: homeBillsData,
		});

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<main className="space-y-12">
				<div className="flex justify-between items-start">
					<div className="flex flex-col items-start gap-2">
						<Header>الفواتير</Header>
						<SubHeader>
							كلام
							كتيييييييييييييييييييييييييييييييييييييييييييييييييييير
						</SubHeader>
					</div>

					<button
						className="bg-primary drop-shadow-lg text-white text-2xl font-semibold flex items-center gap-2 px-4 py-2 rounded-md hover:bg-primary/80 active:bg-primary transition"
						onClick={() => {
							setModalOpen(true);
						}}
					>
						<span>أضف فاتورة</span>
						<PlusIcon className="h-8 w-8"></PlusIcon>
					</button>

					<AnimatePresence>
						{modalOpen && <Modal setOpenModal={setModalOpen} />}
					</AnimatePresence>
				</div>

				<table {...getTableProps()} className="w-full">
					<thead className="bg-secondary h-8">
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										{column.render("Header")}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td
												className="text-center"
												{...cell.getCellProps()}
											>
												{cell.render("Cell")}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data } = await axios({
		url: "http://localhost:3000/home/allprojectbill?page=1&limit=99999&filter=public",
	});
	return {
		props: {
			homeBills: data.map((row) => {
				return {
					...row,
					workersCount: row._count.workers,
					totalCost: 0,
				};
			}),
		}, // will be passed to the page component as props
	};
};

export default Home;
