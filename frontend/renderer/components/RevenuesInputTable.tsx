import React, { useEffect } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useStore } from "../store";
import Input from "./Input";
import TableDeleteButton from "./TableDeleteButton";
interface IProps {
	readOnly?: boolean;
}

function RevenuesInputTable({ readOnly }: IProps) {
	const { revenues, addRevenue, updateRevenue, removeRevenue } = useStore(
		(state) => state,
	);

	return (
		<>
			<div className="space-y-2">
				<h1 className="text-black font-bold text-xl">الايرادات</h1>

				<div className="border-2 border-secondary rounded-md">
					<table className="table-auto w-full">
						<thead className="bg-secondary">
							<tr>
								<th className="p-2 text-start whitespace-nowrap">
									المبلغ
								</th>
								<th className="p-2 text-start whitespace-nowrap">
									التاريخ
								</th>
								{!readOnly && (
									<th className="p-2 text-start whitespace-nowrap"></th>
								)}
							</tr>
						</thead>
						<tbody className="bg-base">
							{revenues.map((revenue) => {
								return (
									<tr key={revenue.id}>
										<td className="p-2">
											<Input
												disabled={readOnly}
												type={"number"}
												value={revenue.amount}
												onChange={(e) =>
													updateRevenue(revenue.id, {
														amount: Number(
															e.target.value,
														),
													})
												}
												placeholder={"المبلغ"}
											></Input>
										</td>
										<td className="p-2">
											<Input
												disabled={readOnly}
												type={"date"}
												value={revenue.date}
												onChange={(e) =>
													updateRevenue(revenue.id, {
														date: e.target.value,
													})
												}
												placeholder={"التاريخ"}
											></Input>
										</td>
										{!readOnly && (
											<td className="p-2 w-8">
												<TableDeleteButton
													disabled={readOnly}
													onClick={() =>
														removeRevenue(
															revenue.id,
														)
													}
												></TableDeleteButton>
											</td>
										)}
									</tr>
								);
							})}
						</tbody>
					</table>
					{!revenues.length && (
						<div className="w-full flex justify-center py-2">
							لا يوجد ايرادات
						</div>
					)}
					{!readOnly && (
						<div className="m-2">
							<button
								className="w-full btn-outline py-1"
								onClick={() => addRevenue()}
							>
								<PlusIcon className="w-6 h-6"></PlusIcon>
								أضف حقل جديد
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default RevenuesInputTable;
