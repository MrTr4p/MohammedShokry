import React, { useState } from "react";
import Head from "next/head";
import tw from "tailwind-styled-components";
import { PlusIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Modal from "../components/Modal";
import { AnimatePresence } from "framer-motion";
import { GetServerSideProps } from "next";
import { useTable } from "react-table";

function Home({
	homeBills,
	billsType,
}: {
	homeBills: any[];
	billsType: "public" | "office";
}) {
	const Header = tw.h1`text-5xl font-bold text-black`;
	const SubHeader = tw.h1`text-xl text-black`;
	const [modalOpen, setModalOpen] = useState(false);

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
				</div>
				<table>
					<tbody></tbody>
					<thead></thead>
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
