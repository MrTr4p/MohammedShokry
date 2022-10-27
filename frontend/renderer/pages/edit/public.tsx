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
} from "../../store";
import Input from "../../components/Input";
import WorkerInputTable from "../../components/WorkerInputTable";
import ExpensesInputTable from "../../components/ExpensesInputTable";
import RevenuesInputTable from "../../components/RevenuesInputTable";
import { useRouter } from "next/router";
import { v4 } from "uuid";

function Public({ billData }: { billData: ProjectBill }) {
	const user = useStore((state) => state.user);

	const router = useRouter();
	const {
		clientName,
		clientAddress,
		name,
		date,
		officePrecentage,
		setClientAddress,
		setDate,
		setClientName,
		setName,
		setOfficePrecentage,
		editBill,
		restState,
		setState,
	} = useStore();
	const [infoMessage, setInfoMessage] = useState({
		message: "",
		error: false,
	});

	useEffect(() => {
		const formattedWorkers: Worker[] = billData.workers.map(
			(data: any) => ({
				rowId: v4(),
				id: data.Worker.id,
				name: data.Worker.name,
				work: data.Worker.work,
				project: {
					id: billData.id,
					date: data.date,
					salary: data.amount,
					precentage: data.precentage,
				},
			}),
		);

		const formattedExpenses: Expense[] = billData.expenses.map(
			(data: any) => ({
				id: data.id,
				materialName: data.materialName,
				date: data.date,
				totalcost: data.totalcost,
				day: data.day,
				section: {
					id: data.section.id,
					name: data.section.name,
				},
			}),
		);

		const formattedRevenues: Revenue[] = billData.revenues.map(
			(data: any) => ({
				id: data.id,
				amount: data.amount,
				date: data.date,
			}),
		);

		const formattedSections: Section[] = billData.sections.map(
			(data: any) => ({
				id: data.id,
				name: data.name,
			}),
		);

		setState({
			id: billData.id,
			name: billData.name,
			clientName: billData.clientName,
			clientAddress: billData.clientAddress,
			date: billData.date,
			officePrecentage: billData.officePrecentage,
			expenses: formattedExpenses,
			sections: formattedSections,
			workers: formattedWorkers,
			revenues: formattedRevenues,
		});
	}, [billData]);

	async function handleEdit() {
		editBill()
			.then((result) => {
				setInfoMessage({ message: result.message, error: false });
				router.push("/");
			})
			.catch((err) => {
				console.log(err)
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
				<Link href="/" href="" className="btn-outline px-6" onClick={restState}>
                    ألغاء<XMarkIcon className="w-6 h-6"></XMarkIcon>

                </Link>
			</header>
			<main className="">
				<div className="border-black border p-4 w-full bg-base drop-shadow rounded-md space-y-6 relative ">
					<div className="flex gap-4 w-full">
						<Input
							onChange={(e) => setClientName(e.target.value)}
							value={clientName}
							label="أسم العميل"
							type={"text"}
							disabled = {user.accountType === 'create'}
						></Input>
						<Input
							value={clientAddress}
							label="عنوان العميل"
							type={"text"}
							onChange={(e) => setClientAddress(e.target.value)}
							disabled = {user.accountType === 'create'}

						></Input>
						<Input
							value={name}
							label="أسم المشروع"
							type={"text"}
							onChange={(e) => setName(e.target.value)}
							disabled = {user.accountType === 'create'}

						></Input>
						<Input
							value={officePrecentage}
							label="نسبة المكتب"
							type={"number"}
							onChange={(e) =>
								setOfficePrecentage(e.target.value)
								
							}
							disabled = {user.accountType === 'create'}

						></Input>
						<Input
							value={date}
							label="التاريخ"
							type={"date"}
							onChange={(e) => setDate(e.target.value)}
							disabled = {user.accountType === 'create'}

						></Input>
					</div>
					<WorkerInputTable></WorkerInputTable>
					<ExpensesInputTable></ExpensesInputTable>
					<RevenuesInputTable></RevenuesInputTable>
					<div></div>
					<div className="bg-secondary flex items-center gap-4 p-4 absolute rounded-b-md -inset-x-[1px] -bottom-16 drop-shadow-md border-black border">
						<button
							className="btn-primary px-12"
							onClick={handleEdit}
						>
							حفظ
						</button>
						{infoMessage.message && (
							<h1
								className={`font-bold text-center text-lg ${
									infoMessage.error
										? "text-red-600"
										: "text-green-600"
								}`}
							>
								{infoMessage.message}
							</h1>
						)}
					</div>
				</div>
			</main>
		</div>
    );
}

export default Public;

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
