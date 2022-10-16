import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import AggregateBillTable from "../../../components/AggregateBillTable";
import { Expense, useStore } from "../../../store";

function aggregate({ billData }: { billData: Expense[] }) {
	function tryhere(){
		alert('u r gay')
	}
	return (
		<div>
			<AggregateBillTable readOnly={true}></AggregateBillTable>

			<button onClick ={tryhere} className=" flex my-16 outline mx-auto pa-12">
			TRY THIS ASSHOLE
		</button>
		</div>
	);
}

export default aggregate;
export const getServerSideProps: GetServerSideProps = async (context) => {
	const id: string = context.query.id as string;

	const { data: billData } = await axios({
		url: `http://localhost:3000/bill/aggregate/get/` + id,
	});

	return {
		props: {
			billData,
		},
	};
};
