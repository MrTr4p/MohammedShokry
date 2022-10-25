import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import AggregateBillTable from "../../../components/AggregateBillTable";
import { Expense, useStore } from "../../../store";
import backgroundImage from "../../../public/images/bill-background.png";
import Image from "next/image";
function aggregate(billData) {
	function tryhere(){
		alert('u r gay')
	}
	return (
		<div>
						<Image src={backgroundImage} layout="fill" />

			<AggregateBillTable Date ={billData} readOnly={true}></AggregateBillTable>
		</div>
	);
}

export default aggregate;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id: string = context.query.id as string;
	const { data: billData } = await axios({
		url: `http://localhost:3000/bill/aggregate/get?id=` + id,
	});
	
	return {
		props: {
			billData
		},
	};
};