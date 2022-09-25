import React from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { PlusIcon } from "@heroicons/react/24/solid";

function Home() {
	const Header = tw.h1`text-5xl font-bold text-black`;
	const SubHeader = tw.h1`text-xl text-black`;

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

					<button className="bg-primary drop-shadow-lg text-white text-2xl font-semibold flex items-center gap-2 px-4 py-2 rounded-md hover:bg-primary/80 active:bg-primary transition ">
						<span>أضف فاتورة</span>
						<PlusIcon className="h-8 w-8"></PlusIcon>
					</button>
				</div>
			</main>
		</>
	);
}

export default Home;
