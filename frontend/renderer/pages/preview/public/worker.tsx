import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import WorkerPicker from "../../../components/WorkerPicker";
import { Expense, useStore } from "../../../store";
import backgroundImage from "../../../public/images/bill-background.png";
import Image from "next/image";
function worker(billData) {
	const billId = billData
	return (
		<div>
			
						<WorkerPicker billId = {billId}></WorkerPicker>
						
		</div>
	);
}

export default worker;


export const getServerSideProps: GetServerSideProps = async (context) => {
	const id: string = context.query.id as string;
	const { data: billData } = await axios({
		url: `http://localhost:8000/api/get/public?id=` + id
	});
	return {
		props: {
			billData : billData.id,
		},
	};
};