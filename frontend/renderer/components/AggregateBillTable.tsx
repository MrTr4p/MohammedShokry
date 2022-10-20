import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
	Expense,
	ProjectBill,
	Revenue,
	Section,
	useStore,
	Worker,
} from "../store";
import PreviewInput from "../components/PreviewInput";
import PreviewWorker from "../components/PreviewWorker";
import PreviewExpenses from "../components/PreviewExpenses";
import PreviewRevenues from "../components/PreviewRevenues";
import { useRouter } from "next/router";
import { v4 } from "uuid";
interface IProps {
	readOnly?: boolean;
}
function AggregateBillTable({ readOnly }: IProps, { billData }: { billData: ProjectBill }) {

	const router = useRouter();
	const {
		clientName,
		clientAddress,
		name,
		date,
		officePrecentage,
		editBill,
		restState,
	} = useStore();
	const [infoMessage, setInfoMessage] = useState({
		message: "",
		error: false,
	});

	async function handleEdit() {
		editBill()
			.then((result) => {
				setInfoMessage({ message: result.message, error: false });
				router.push("/");
			})
			.catch((err) => {
				setInfoMessage({
					message: err.response.data.message,
					error: true,
				});
			});
	}

	return (
		<div className="space-y-12">
			<header className="flex justify-between items-start">
				<div className="flex flex-col items-start gap-2">
					<h1 className="text-black font-bold text-3xl">
						تعديل فاتورة عامة
					</h1>
					<p>
						هنا يمكنك ملئ الحقول لتعديل فاتورة عامة (فاتورة مشروع)
					</p>
				</div>
				<Link href="/">
					<a href="" className="btn-outline px-6" onClick={restState}>
						ألغاء
						<XMarkIcon className="w-6 h-6"></XMarkIcon>
					</a>
				</Link>
			</header>
			<main className="">
				<div className="border-black border p-4 w-full bg-base drop-shadow rounded-md space-y-6 relative ">
					<div className="flex gap-4 w-full">
						<PreviewInput
							value={clientName}
							label="أسم العميل"
							type={"text"}
							disabled
						></PreviewInput>
						<PreviewInput
							value={clientAddress}
							label="عنوان العميل"
							type={"text"}
							disabled
						></PreviewInput>
						<PreviewInput
							value={name}
							label="أسم المشروع"
							type={"text"}
							disabled
						></PreviewInput>
						<PreviewInput
							value={officePrecentage}
							label="نسبة المكتب"
							type={"number"}
							disabled

						></PreviewInput>
						<PreviewInput
							value={date}
							label="التاريخ"
							type={"date"}
							disabled
						></PreviewInput>
					</div>
					<PreviewWorker></PreviewWorker>
					<PreviewExpenses></PreviewExpenses>
					<PreviewRevenues></PreviewRevenues>
					<div></div>
					<div className="bg-secondary flex items-center gap-4 p-4 absolute rounded-b-md -inset-x-[1px] -bottom-16 drop-shadow-md border-black border">
						<button
							className="btn-primary px-12"
						>
							طبع
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}

export default AggregateBillTable;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id: string = context.query.id as string;

	const { data: billData } = await axios({
		url: `http://localhost:3000/bill/all/get?id=` + id,
	});

	return {
		props: {
			billData,
		},
	};
};
