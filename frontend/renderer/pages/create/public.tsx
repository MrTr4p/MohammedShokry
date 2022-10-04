import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import Input from "../../components/Input";
import { useStore } from "../../store";

function Public() {
	const {
		clientName,
		clientAddress,
		name,
		revenues,
		workers,
		date,
		officePrecentage,
		sections,
		expenses,
		dropdownWorkers,
		setClientAddress,
		setDate,
		setClientName,
		setName,
		addSection,
		removeSection,
		updateSection,
		addExpense,
		updateExpense,
		removeExpense,
		addRevenue,
		updateRevenue,
		removeRevenue,
		addWorker,
		updateWorker,
		removeWorker,
		setOfficePrecentage,
		setDropdownWorkers,
	} = useStore((state) => state);

	return (
		<div className="space-y-12">
			<header className="flex justify-between items-start">
				<div className="flex flex-col items-start gap-2">
					<h1 className="text-black font-bold text-3xl">
						أضافة فاتورة عامة جديدة
					</h1>
					<p>هنا يمكنك ملئ الحقول لصنع فاتورة عامة (فاتورة مشروع)</p>
				</div>
				<Link href="/">
					<a href="" className="btn-outline px-6">
						ألغاء
						<XMarkIcon className="w-6 h-6"></XMarkIcon>
					</a>
				</Link>
			</header>
			<main>
				<div className="border-black border p-4 w-full bg-base drop-shadow rounded-md">
					<div className = "flex gap-4 w-full">

					<Input
						label="أسم العميل"
						type={"text"}
						onChange={(e) => setName(e.target.value)}
					></Input>
					<Input
						label="عنوان العميل"
						type={"text"}
						onChange={(e) => setClientAddress(e.target.value)}
					></Input>
					<Input
						label="أسم المشروع"
						type={"text"}
						onChange={(e) => setName(e.target.value)}
					></Input>
					<Input
						label="نسبة المكتب"
						type={"number"}
						onChange={(e) => setOfficePrecentage(e.target.value)}
					></Input>
					<Input
						label="التاريخ"
						type={"date"}
						onChange={(e) => setDate(e.target.value)}
					></Input>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Public;
