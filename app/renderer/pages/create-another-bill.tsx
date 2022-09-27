import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import { FolderPlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import CreateInput from "../components/CreateInput";
import { Worker } from "../typings/interfaces";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/router";

interface Inputs {
	name: string;
	amount: number;
	inReturn: string;
	date: string;
	description: string;
}

function Home() {
	const Header = tw.h1`text-5xl font-bold text-black`;
	const Header2 = tw.h1`text-3xl font-bold text-black`;
	const SubHeader = tw.h1`text-xl text-black`;
	const [input, setInput] = useState<Partial<Inputs>>({
		name: "",
		inReturn: "",
		amount: 0,
		date: "",
		description: "",
	});
	const [message, setMessage] = useState("");

	async function sendAnotherBill() {
		try {
			const result = await axios({
				url: "http://localhost:3000/bill/special/create",
				method: "POST",
				data: {
					name: input.name,
					date: input.date,
					inReturn: input.inReturn,
					amount: Number(input.amount),
					description: input.description,
				},
			});
		} catch (e) {
			if (e.response.data.status == 400) {
				console.log(e.response.data.error);
				setMessage(e.response.data.error);
			}
		}
		//

		//if(result.data == 'BAD')
	}

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
					{message && (
						<div className="flex justify-between items-start">
							<h1 className="text-xl text-red-700 mb-4">
								{message}
							</h1>
							<button onClick={() => setMessage("")}>
								<XCircleIcon className="h-8 w-8"></XCircleIcon>
							</button>
						</div>
					)}
					<div className=" flex  gap-4">
						<CreateInput
							onChange={(e) =>
								setInput((state) => ({
									...state,
									name: e.target.value,
								}))
							}
						>
							أسم العميل
						</CreateInput>
						<CreateInput
							onChange={(e) =>
								setInput((state) => ({
									...state,
									inReturn: e.target.value,
								}))
							}
						>
							المقابل
						</CreateInput>
						<CreateInput
							onChange={(e) =>
								setInput((state) => ({
									...state,
									amount: e.target.value,
								}))
							}
							type="number"
						>
							المبلغ
						</CreateInput>
						<CreateInput
							type="date"
							onChange={(e) =>
								setInput((state) => ({
									...state,
									date: e.target.value,
								}))
							}
						>
							التاريخ
						</CreateInput>
					</div>
					<div className="mt-10">
						<label>
							الملاحظة
							<textarea
								onChange={(e) =>
									setInput((state) => ({
										...state,
										description: e.target.value,
									}))
								}
								className="mt-4 flex  border w-full pt-1 px-2 border-dashed bg-base border-black focus:outline-primary resize-y rounded-md"
							></textarea>
						</label>
					</div>
					<div className="flex mt-4">
						<button
							onClick={sendAnotherBill}
							className=" justify-center outline outline-primary w-full mx-1 bg-white drop-shadow-lg text-primary text-xl font-semibold flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/10 active:bg-primary/10 transition"
						>
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
