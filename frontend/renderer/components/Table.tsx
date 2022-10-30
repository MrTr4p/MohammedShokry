import {
	CalendarDaysIcon,
	DocumentMagnifyingGlassIcon,
	PencilSquareIcon,
	TrashIcon,
	

} from "@heroicons/react/24/outline";
import Link from "next/link";
import React , {useState} from "react";
import {useStore } from "../store";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import PublicPagination from './PublicPagination'
import OfficePaginate from './OfficePaginate'
import { dataItem } from "react-widgets/cjs/Accessors";

function Table({title,type = "public",  data, page, handlePagination } : {handlePagination; page; title?: string;type: "office" | "public"; data: any[];}) {
	const user = useStore((state) => state.user);
	const removeHomePublicBill = useStore(
		(state) => state.removeHomePublicBill,
	);
	const removeHomeOfficeBill = useStore(
		(state) => state.removeHomeOfficeBill,
	);
	async function handleDelete(id: number) {
		if (type === "office") {
			removeHomeOfficeBill(id);
		} else {
			removeHomePublicBill(id);
		}

		console.log(type, id);
	}
	function handlePageClick () {

	  };
	 
	
	
	  

	return (
		<div className="flex flex-col items-start gap-4 w-full overflow-x-scroll">
			{title && <h1 className="text-black font-bold text-xl">{title}</h1>}

			<table className="table-auto w-full border-2 border-secondary rounded-md ">
				<thead className="bg-secondary">
					<tr className="">
						<th className="p-2 text-start whitespace-nowrap">
							الأعدادات
						</th>
						<th className="p-2 text-start whitespace-nowrap">
							رقم الفاتورة
						</th>
						{type === "public" && (
							<th className="p-2 text-start whitespace-nowrap">
								أسم العميل
							</th>
						)}
						<th className="p-2 text-start whitespace-nowrap">
							أسم المشروع
						</th>
						<th className="p-2 text-start whitespace-nowrap">
							التاريخ
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row) => {
						return (
						
							<tr
								className=" align-middle"
								key={`${row.clientName}/${row.id}`}
							>
								<td
									className={`p-2 flex items-center gap-2 ${
										user.accountType === "edit"
											? "w-32"
											: "w-8"
									}`}
								>
									{user.accountType === "edit" && (
										<>
											<ConfirmDeleteModal
												onConfirm={() =>
													handleDelete(row.id)
												}
											>
												<div className="transition bg-red-500 border border-black/25 hover:bg-red-400 justify-center text-base active:bg-red-600 drop-shadow rounded-md px-1 py-1">
													<TrashIcon className="w-6 h-6"></TrashIcon>
												</div>
											</ConfirmDeleteModal>
										
										</>
									)}
										<Link
												href={`/Edit/${type}?id=${row.id}`}
											>
												<a
													href={`/Edit/bill/${type}?id=${row.id}`}
													className="transition bg-base border border-black/25 hover:bg-secondary-hover justify-center active:bg-secondary-active drop-shadow rounded-md px-1 py-1"
												>
													<PencilSquareIcon className="w-6 h-6"></PencilSquareIcon>
												</a>
											</Link>
									<Link
									
										href={`/preview/${type}?id=${row.id}`}
									>
										<a
											href={`/preview/${type}?id=${row.id}`}
											className="transition bg-base border border-black/25 hover:bg-secondary-hover justify-center active:bg-secondary-active drop-shadow rounded-md px-1 py-1"
										>
											<DocumentMagnifyingGlassIcon  className="w-6 h-6"></DocumentMagnifyingGlassIcon>
										</a>
									</Link>
								</td>

								<td className="p-2 ">
									<span>{row.id}#</span>
								</td>

								{type === "public" ? (
									<>
										<td className="p-2 ">
											<span>{row.clientName}</span>
										</td>
										<td className="p-2 ">
											<span>{row.name}</span>
										</td>
									</>
								) : (
									<td className="p-2 ">
										<span>{row.projectName}</span>
									</td>
								)}
								<td className="p-2  ">
									<div className="flex items-center gap-2">
										<CalendarDaysIcon className="w-5 h-5"></CalendarDaysIcon>
										<span>{row.date}</span>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="mx-auto">
			{type === 'office' ? (
				//@ts-ignore
				<OfficePaginate pagecount ={page} type ='office' func = {handlePagination}></OfficePaginate>
			)
			:
			(
				//@ts-ignore
				<PublicPagination pagecount ={page} type ='public' func = {handlePagination}></PublicPagination>

			)
}
			</div>
		</div>
	);
}

export default Table;

