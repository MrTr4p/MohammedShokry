import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import AggregateBillTable from "../../../components/AggregateBillTable";
import { Expense, useStore } from "../../../store";

function aggregate({ billData }: { billData: Expense[] }) {
	return (
		<div>
			<AggregateBillTable readOnly={true}></AggregateBillTable>
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
