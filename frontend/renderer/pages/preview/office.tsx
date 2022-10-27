import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import {
	AnotherPaymentsBill,
	useAnotherPaymentsBillStore,
	useStore,
} from "../../store";
import { XMarkIcon } from "@heroicons/react/24/outline";
import WorkerInputTable from "../../components/WorkerInputTable";
import ExpensesInputTable from "../../components/ExpensesInputTable";
import RevenuesInputTable from "../../components/RevenuesInputTable";
import { useRouter } from "next/router";
import TextArea from "../../components/Textarea";
import { GetServerSideProps } from "next";
import backgroundImage from "../../public/images/bill-background.png";
import Image from "next/image";

function Office({ billData }: { billData: AnotherPaymentsBill }) {
	const {
		amount,
		date,
		inReturn,
		projectName,
		description,
		editBill,
		saveBill,
		setState,
		setAmount,
		setDate,
		setDescription,
		setInReturn,
		setProjectName,
		resetState,
	} = useAnotherPaymentsBillStore((state) => state);

	useEffect(() => {
		setState(billData);
	}, [billData]);

	const [infoMessage, setInfoMessage] = useState({
		message: "",
		error: false,
	});

	const router = useRouter();

	async function handlePrint() {}

	return <>
        <Image src={backgroundImage} layout="fill" />
        <div className="space-y-12">
            <header className="flex justify-between items-start print:hidden">
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-black font-bold text-3xl">
                        عرض فاتورة خاصة
                    </h1>
                    <p>هنا يمكنك عرض فاتورة خاصة (فاتورة اخرى)</p>
                </div>
                <Link href="/" href="" className="btn-outline px-6" onClick={resetState}>
                    ألغاء<XMarkIcon className="w-6 h-6"></XMarkIcon>

                </Link>
            </header>
            <main className="">
                <div className="border-black border p-4 w-full bg-base rounded-md space-y-6 relative print:border-none print:drop-shadow-none">
                    <div className="grid grid-flow-row grid-cols-3 gap-4 w-full">
                        <Input
                            disabled={true}
                            value={projectName}
                            label="أسم المشروع"
                            type={"text"}
                            onChange={(e) => setProjectName(e.target.value)}
                        ></Input>
                        <Input
                            disabled={true}
                            value={inReturn}
                            label="مقابل"
                            type={"text"}
                            onChange={(e) => setInReturn(e.target.value)}
                        ></Input>
                        <Input
                            disabled={true}
                            value={amount}
                            label="المبلغ"
                            type={"number"}
                            onChange={(e) => setAmount(e.target.value)}
                        ></Input>
                        <Input
                            disabled={true}
                            value={date}
                            label="التاريخ"
                            type={"date"}
                            onChange={(e) => setDate(e.target.value)}
                        ></Input>
                    </div>
                    <TextArea
                        disabled={true}
                        label="ملاحظات"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></TextArea>
                    <div></div>
                    <div className="bg-secondary print:hidden flex items-center gap-4 p-4 absolute rounded-b-md -inset-x-[1px] -bottom-16 drop-shadow-md border-black border">
                        <button
                            className="btn-primary px-12"
                            onClick={handlePrint}
                        >
                            طبع
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
    </>;
}

export default Office;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id: string = context.query.id as string;

	const { data: billData } = await axios({
		url: `http://localhost:3000/bill/another/get?id=` + id,
	});

	return {
		props: {
			billData,
		},
	};
};
