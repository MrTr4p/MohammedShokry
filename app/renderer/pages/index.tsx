import React, { useState } from "react";
import Head from "next/head";
import tw from "tailwind-styled-components";
import { PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Modal from "../components/Modal";
import { AnimatePresence, motion } from "framer-motion";

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

					<AnimatePresence>
						{modalOpen && (
							<motion.div
								initial={{ scale: 0.5 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0.5 }}
							>
								<Modal setOpenModal={setModalOpen} />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</main>
		</>
	);
}

export async function getServerSideProps(context) {
	const result = await axios({
		url: "http://localhost:3000/home/allprojectbill?page=1&limit=99999&filter=public",
	});
	console.log(result);
	return {
		props: {}, // will be passed to the page component as props
	};
}

export default Home;
