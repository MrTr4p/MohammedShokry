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
function AggregateBillTable(Date , { readOnly }: IProps,) {
	const aggregates = Date.Date.billData;
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




	return (
		<div className="space-y-6 ">
			<main className="">
				<div className="border-black border mx-auto mt-[10rem] p-3 w-4/12 bg-base drop-shadow rounded-md space-y-2 relative ">
					{aggregates.map((aggregate)=>{
					return(
					<>
					<div className="flex justify-center">
					<PreviewInput className ='mx-16 ' value={aggregate.name}>
						
						</PreviewInput>
						<PreviewInput className ='mx-16 ' value={ aggregate.totalCost}>

						</PreviewInput>
					</div>
					</>
					)
					})}
					<div>
						
					</div>
					<div></div>
					<div className="bg-secondary flex items-center gap-4 p-4 absolute rounded-b-md -inset-x-[1px] -bottom-16 drop-shadow-md border-black border">
						
						
						<button
						onClick={()=>{
							console.log(aggregates)
						}}
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


