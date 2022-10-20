import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import WorkerPicker from "../../../components/WorkerPicker";
import { Expense, useStore } from "../../../store";
import backgroundImage from "../../../public/images/bill-background.png";
import Image from "next/image";
function expenses(billData) {

	return (
		<div>
			<WorkerPicker readOnly={true}></WorkerPicker>
		</div>
	);
}

export default expenses;

