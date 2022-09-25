import React from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { XMarkIcon } from "@heroicons/react/24/solid";

function Home() {
	const Header = tw.h1`text-5xl font-bold text-black`;
	const SubHeader = tw.h1`text-xl text-black`;

	return (
		<>
			<Head>
				<title>Create New</title>
			</Head>
			<main>
				<div className="flex justify-between items-start">
					<div className="flex flex-col items-start gap-2">
						<Header>أضافة فاتورة جديدة</Header>
						<SubHeader>
							كلام
							كتيييييييييييييييييييييييييييييييييييييييييييييييييييير
							كتيييييييييييييييييييييييييييييييييييييييييييييييييييير
						</SubHeader>
					</div>

					<button className="bg-primary drop-shadow-lg text-white text-2xl font-semibold flex items-center gap-2 px-4 py-2 rounded-md hover:bg-primary/80 active:bg-primary transition ">
						<span>الغاء</span>
						<XMarkIcon className="h-8 w-8"></XMarkIcon>
					</button>
				</div>
			</main>
		</>
	);
}

export default Home;
