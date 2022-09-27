import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import CreateInput from "../components/CreateInput";
import { Worker } from "../typings/interfaces";
import { v4 as uuidv4 } from "uuid";

function Home() {
	const Header = tw.h1`text-5xl font-bold text-black`;
	const Header2 = tw.h1`text-3xl font-bold text-black`;
	const SubHeader = tw.h1`text-xl text-black`;

	return (
		<>
			<Head>
				<title>Create New</title>
			</Head>
			<main className="space-y-12">
				<div className="flex justify-between items-start">
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
				<div className=" shadow-lg border border-black p-4 rounded-md ">
					<div className=" flex  gap-4">
						<CreateInput>أسم العميل</CreateInput>
                        <CreateInput>ألمكتب </CreateInput>
                        <CreateInput>المبلغ </CreateInput>
                        <CreateInput type ='date'>التاريخ </CreateInput>
					
				
					</div>
					<div className="mt-10">
						<label>
							الملاحظة
							<textarea className="mt-4 flex  border w-full pt-1 px-2 border-dashed bg-base border-black focus:outline-primary resize-y rounded-md"></textarea>
						</label>
					</div>
					<div className="flex   mt-4">
						<button className=" justify-center outline outline-primary w-full mx-1 bg-white drop-shadow-lg text-primary text-xl font-semibold flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/10 active:bg-primary/10 transition">
							حفظ
							<FolderPlusIcon className="w-5 h-5 mx-1"></FolderPlusIcon>
						</button>
					</div>
				</div>
			</main>
		</>
	);
}

export default Home;
