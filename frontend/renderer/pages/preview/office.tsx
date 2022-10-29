import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import {
	AnotherPaymentsBill,
	useAnotherPaymentsBillStore,
	useStore,
} from "../../store";
import { PrinterIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
       {
        //@ts-ignore
        <Image src={backgroundImage} layout="fill" />
       }
        <div className="space-y-12">
            <header className="flex justify-between items-start print:hidden">
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-black font-bold text-3xl">
                        عرض فاتورة خاصة
                    </h1>
                    <p>هنا يمكنك عرض فاتورة خاصة (فاتورة اخرى)</p>
                </div>
                <Link href="/" className="btn-outline px-6" onClick={resetState}>
                    <a className="btn-outline px-6">
                    ألغاء<XMarkIcon className="w-6 h-6"></XMarkIcon>
                    </a>

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
                </div>
            </main>
            <div>
				<div className=" print:hidden absolute -inset-x-[1px] bottom-0 mb-2 mx-4 z-0 	">
					<button className="bg-primary text-white rounded-full p-1 hover:bg-violet-600 active:bg-violet-800 " onClick={()=>{
			window.print()
			
			
			

		}}>
			<PrinterIcon className="w-5 h-5 m-1 rounded-full "></PrinterIcon>
		</button>
					</div>
				</div>
        </div>
    </>;
}

export default Office;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id: string = context.query.id as string;

	const { data: billData } = await axios({
		url: `http://localhost:8000/api/get/office?id=` + id,
	});

	return {
		props: {
			billData,
		},
	};
};
