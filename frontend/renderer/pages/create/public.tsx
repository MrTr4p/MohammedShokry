import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useStore } from "../../store";
import { XMarkIcon } from "@heroicons/react/24/outline";
import WorkerInputTable from "../../components/WorkerInputTable";
import ExpensesInputTable from "../../components/ExpensesInputTable";
import RevenuesInputTable from "../../components/RevenuesInputTable";
import { useRouter } from "next/router";
function Public() {
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
		saveBill,
		restState,
	} = useStore((state) => state);
	const [infoMessage, setInfoMessage] = useState({
		message: "",
		error: false,
	});

	useEffect(() => restState(), []);

	const router = useRouter();

	async function handleSave() {
		saveBill()
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
						أضافة فاتورة عامة جديدة
					</h1>
					<p>هنا يمكنك ملئ الحقول لصنع فاتورة عامة (فاتورة مشروع)</p>
				</div>
				<Link href="/" className="btn-outline px-6" onClick={restState}>
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
						></Input>
						<Input
							value={clientAddress}
							label="عنوان العميل"
							type={"text"}
							onChange={(e) => setClientAddress(e.target.value)}
						></Input>
						<Input
							value={name}
							label="أسم المشروع"
							type={"text"}
							onChange={(e) => setName(e.target.value)}
						></Input>
						<Input
							value={officePrecentage}
							label="نسبة المكتب"
							type={"number"}
							onChange={(e) =>
								setOfficePrecentage(e.target.value)
							}
						></Input>
						<Input
							value={date}
							label="التاريخ"
							type={"date"}
							onChange={(e) => setDate(e.target.value)}
						></Input>
					</div>
					<WorkerInputTable></WorkerInputTable>
					<ExpensesInputTable></ExpensesInputTable>
					<RevenuesInputTable></RevenuesInputTable>
					<div></div>
					<div className="bg-secondary flex items-center gap-4 p-4 absolute rounded-b-md -inset-x-[1px] -bottom-16 drop-shadow-md border-black border">
						<button
							className="btn-primary px-12"
							onClick={handleSave}
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
