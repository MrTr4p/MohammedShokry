import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import Input from "../../components/Input";
import { useNewBillStore } from "../../store";

function Public() {
	const newBillStore = useNewBillStore((state) => state);

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
					<Input
						label="أسم العميل"
						type={"text"}
						onChange={(e) => console.log(e.target.value)}
					></Input>
				</div>
			</main>
		</div>
	);
}

export default Public;
