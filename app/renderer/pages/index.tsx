import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { PlusIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Modal from "../components/Modal";

import { motion } from "framer-motion"


function Home(isOpen) {
	const Header = tw.h1`text-5xl font-bold text-black`;
	const SubHeader = tw.h1`text-xl text-black`;
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<main>
				<div className="flex justify-between items-start">
					<div className="flex flex-col items-start gap-2">
						<Header>الفواتير</Header>
						<SubHeader>
							كلام
							كتيييييييييييييييييييييييييييييييييييييييييييييييييييير
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
					{modalOpen && <Modal setOpenModal={setModalOpen} />}


				</div>
			</main>
		</>
	);
}

/*export async function getServerSideProps(context) {
	const result = await axios({
		url: "http://localhost:3000/home/allprojectbill?page=1&limit=2&filter=public",
	});
	console.log(result);
	return {
		props: {}, // will be passed to the page component as props
	};
}*/

export default Home;
