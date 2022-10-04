import {
	CalendarDaysIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { ProjectBill } from "../store";

function Table({ data, title }: { title?: string; data: ProjectBill[] }) {
	return (
		<div className="flex flex-col items-start gap-4 w-full">
			{title && <h1 className="text-black font-bold text-xl">{title}</h1>}

			<table className="table-auto w-full border-2 border-secondary rounded-md">
				<thead className="bg-secondary">
					<tr>
						<th className="p-2 text-start whitespace-nowrap">رقم الفاتورة</th>
						<th className="p-2 text-start whitespace-nowrap">أسم العميل</th>
						<th className="p-2 text-start whitespace-nowrap">أسم المشروع</th>
						<th className="p-2 text-start whitespace-nowrap">التاريخ</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row) => {
						return (
							<tr key={row.id + row.clientName}>
								<td className="p-2 flex items-center gap-2">
									<Link href={`/edit/public/${row.id}`}>
										<a
											href={`/edit/bill/public/${row.id}`}
											className="transition bg-base border border-black/25 hover:bg-secondary-hover justify-center active:bg-secondary-active drop-shadow rounded-md px-2 py-1"
										>
											<PencilSquareIcon className="w-6 h-6"></PencilSquareIcon>
										</a>
									</Link>
									<span>{row.id}#</span>
								</td>
								<td className="p-2">
									<span>{row.clientName}</span>
								</td>
								<td className="p-2">
									<span>{row.name}</span>
								</td>
								<td className="p-2 flex items-center gap-2">
									<CalendarDaysIcon className="w-6 h-6"></CalendarDaysIcon>
									{row.date}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
