import {
	CalendarDaysIcon,
	LinkIcon,
	PencilIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect } from "react";
import BillTypeModal from "../components/BillTypeModal";
import Table from "../components/Table";
import { ProjectBill, useStore } from "../store";

interface IProps {
	publicBills: ProjectBill[];
	officeBills: ProjectBill[];
}

const IndexPage = ({ publicBills, officeBills }: IProps) => {
	const homePublicBills = useStore((state) => state.homePublicBills);
	const homeOfficeBills = useStore((state) => state.homeOfficeBills);
	const setHomePublicBills = useStore((state) => state.setHomePublicBills);
	const setHomeOfficeBills = useStore((state) => state.setHomeOfficeBills);

	useEffect(() => {
		setHomePublicBills(publicBills);
		setHomeOfficeBills(officeBills);
	}, [publicBills, officeBills]);

	return (
		<div className="space-y-12">
			<header className="flex justify-between items-start">
				<div className="flex flex-col items-start gap-2">
					<h1 className="text-black font-bold text-3xl">الفواتير</h1>
					<p>هنا يوجد جميع الفواتير ويمكن البحث فيهم</p>
				</div>
				<BillTypeModal></BillTypeModal>
			</header>
			<main>
				<div className="flex gap-6">
					<Table data={homePublicBills.slice(0, 50)}></Table>
					<Table data={homeOfficeBills.slice(0, 50)}></Table>
				</div>
			</main>
		</div>
	);
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data: billsData } = await axios({
		url: "http://localhost:3000/getAll?type=public",
	});

	return {
		props: {
			publicBills: billsData,
			officeBills: billsData,
		},
	};
};
