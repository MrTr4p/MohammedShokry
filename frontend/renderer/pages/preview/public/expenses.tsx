import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import ExpensesPick from "../../../components/ExpensesPick";
import { Expense, useStore } from "../../../store";
import backgroundImage from "../../../public/images/bill-background.png";
import Image from "next/image";
function expenses(billData) {
	const billId = billData

	return (
		<div>
						<ExpensesPick billId = {billId}></ExpensesPick>

		</div>
	);
}

export default expenses;
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
