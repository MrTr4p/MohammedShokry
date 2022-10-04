import {
	CalendarDaysIcon,
	LinkIcon,
	PencilIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useRef } from "react";
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
	const searchState = useStore((state) => state.searchState);

	const searchRef = useRef();
	const setHomePublicBills = useStore((state) => state.setHomePublicBills);
	const setHomeOfficeBills = useStore((state) => state.setHomeOfficeBills);
	const setSearchState = useStore((state) => state.setSearchState);

	async function search(e: any) {
		e.preventDefault();
		if (searchState === "loading") return;

		if (searchRef?.current) {
			const query = (searchRef.current as any).value?.trim() || "";
			if (query) {
				setSearchState("loading");
				let { data } = await axios({
					url: "http://localhost:3000/search?query=" + query,
				});
				if (
					data &&
					(data.projectBills.length > 0 ||
						data.anotherBills.length > 0)
				) {
					setSearchState("found");
					setHomePublicBills(data.projectBills);
					setHomeOfficeBills(data.anotherBills);
				} else {
					setSearchState("empty");
				}
			} else {
				setSearchState("empty");
			}
		}
	}

	useEffect(() => {
		if (searchState === "empty") {
			setHomePublicBills(publicBills);
			setHomeOfficeBills(officeBills);
		}
	}, [searchState]);

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
			<main className="space-y-6">
				<form action="" onSubmit={search}>
					<input
						ref={searchRef}
						type="text"
						placeholder="بحث"
						className="bg-base drop-shadow-md w-full border border-black/25 rounded-md h-12 px-4 text-black font-medium placeholder:text-black/60 focus:outline-primary	"
					/>
				</form>

				<div
					className={`flex flex-col lg:flex-row md:gap-4 lg:gap-6 relative ${
						searchState === "loading" &&
						"select-none pointer-events-none"
					}`}
				>
					<Table
						title={"الفواتير العامة"}
						data={homePublicBills.slice(0, 50)}
					></Table>
					<Table
						title={"الفواتير الخاصة"}
						data={homeOfficeBills.slice(0, 50)}
					></Table>

					<AnimatePresence>
						{searchState === "loading" && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute bg-primary/25 inset-0 -top-2 -right-2 -left-2 overflow-hidden  z-40 rounded-md grid justify-center"
							>
								<motion.div
									initial={{ y: 300, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: 300, opacity: 0 }}
								>
									<svg
										className="animate-spin mt-[35vh] h-24 w-24 text-primary"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
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
