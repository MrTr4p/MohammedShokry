import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import BillTypeModal from "../components/BillTypeModal";

const IndexPage = () => {
	return (
		<div className="space-y-12">
			<header className="flex justify-between items-start">
				<div className="flex flex-col items-start gap-2">
					<h1 className="text-black font-bold text-3xl">الفواتير</h1>
					<p>هنا يوجد جميع الفواتير ويمكن البحث فيهم</p>
				</div>
				<BillTypeModal></BillTypeModal>
			</header>
			<main></main>
		</div>
	);
};

export default IndexPage;
