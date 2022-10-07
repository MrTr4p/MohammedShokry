import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { Expense, useStore } from "../../../store";

function detaild({ billData }: { billData: Expense[] }) {
	const setExpenses = useStore((state) => state.setExpenses);
	useEffect(() => {
		setExpenses(billData);
	}, []);
	return <div></div>;
}

export default detaild;
export const getServerSideProps: GetServerSideProps = async (context) => {
	const id: string = context.query.id as string;

	const { data: billData } = await axios({
		url: `http://localhost:3000/bill/detailed/get/` + id,
	});

	return {
		props: {
			billData,
		},
	};
};
