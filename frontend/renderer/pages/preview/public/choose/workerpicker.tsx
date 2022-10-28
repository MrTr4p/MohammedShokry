import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../../public/images/logo.png";
import { useStore } from "../../../../store";
import { GetServerSideProps } from "next";
import axios from "axios";
import ChooseInput from "../../../../components/ChooseInput";
import backgroundImage from "../../../../public/images/bill-background.png";
import {
	CheckIcon,
	ChevronUpDownIcon,
	PlusIcon,
	TrashIcon,
	XMarkIcon,
	PrinterIcon,
} from "@heroicons/react/24/outline";
import * as elc from 'electron'
import PreviewInput from "../../../../components/PreviewInput";
function workerpicker(billData) {
	const [show, setShow] = useState(true);

	const WorkerData = billData.billData
	return (
		<>
								{
									//@ts-ignore
									<Image className="-z-50" src={backgroundImage} layout="fill" />
								}

	
					

			<div className="space-y-6 my-40	">
				<main>
					<div className="lg:flex md:flex mx-auto p-3 w-full justify-center rounded-md relative">
				<div className="lg:ml-4 md:ml-4 w-full">
				<ChooseInput
												disabled
												type={"name"}
												value={WorkerData.projectName}
												iclassName="border-dotted"
												label="اسم الفاتورة"
					></ChooseInput>
				
				</div>
					<div className="lg:mr-4 md:mr-4	w-full">
					<ChooseInput
												disabled
												type={"name"}
												value={WorkerData.worker}
												iclassName="border-dotted"
												label="اسم العامل"
					></ChooseInput>
					</div>
					</div>
					<table className="table-auto w-full border-2 border-secondary rounded-full ">
									<thead  className="bg-secondary">
										<tr>
										<th className="p-2 text-start whitespace-nowrap">
												 البلغ الكلي
											</th>
											<th className="p-2 text-start whitespace-nowrap">
												 التاريخ
											</th>
											
										</tr>
									</thead>
									<tbody>
									{WorkerData.data.map((worker)=>{
											return (
												<tr>
												<td>
												
													<PreviewInput type={'number'} value={worker.totalCost}></PreviewInput>
												
												</td>
												<td>
												
												<PreviewInput type={'date'} value={worker.date}></PreviewInput>
											
											</td>
											
											</tr>
											)
											})}
									</tbody>
								</table>			
					
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
		</>
	);
}

export default workerpicker;
export const getServerSideProps: GetServerSideProps = async (context) => {
	const id: string = context.query.id as string;
	const name : string = context.query.name as string;
	console.log('This is expe' , context.query)
	const url = encodeURI(`http://localhost:3000/get/worker?name=${name}&id=${id}`)
	const { data: billData } = await axios({
		url: url,
	});
	console.log(billData)
	return {
		props: {
			suppressHydrationWarning: true,
			billData : billData,
		},
	};
};
