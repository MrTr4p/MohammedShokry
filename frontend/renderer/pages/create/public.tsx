import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import Input from "../../components/Input";
import { useStore, Worker } from "../../store";
import Combobox from "react-widgets/Combobox";

function Public() {
	const {
		clientName,
		clientAddress,
		name,
		revenues,
		workers,
		date,
		officePrecentage,
		sections,
		expenses,
		dropdownWorkers,
		setClientAddress,
		setDate,
		setClientName,
		setName,
		addSection,
		removeSection,
		updateSection,
		addExpense,
		updateExpense,
		removeExpense,
		addRevenue,
		updateRevenue,
		removeRevenue,
		addWorker,
		updateWorker,
		removeWorker,
		setOfficePrecentage,
		setDropdownWorkers,
	} = useStore((state) => state);

	useEffect(() => {
		if (!(dropdownWorkers.length > 0)) {
			axios({
				url: "http://localhost:3000/search/workers/get",
			}).then(({ data }) => {
				setDropdownWorkers(data);
			});
		}

		if (workers.length <= 0) {
			addWorker("004dd94d-3ba2-4ccf-a4ab-50da9a8db52e");
		}
	}, []);

	return (
		<div className="space-y-12">
			<header className="flex justify-between items-start">
				<div className="flex flex-col items-start gap-2">
					<h1 className="text-black font-bold text-3xl">
						أضافة فاتورة عامة جديدة
					</h1>
					<p>هنا يمكنك ملئ الحقول لصنع فاتورة عامة (فاتورة مشروع)</p>
				</div>
				<Link href="/">
					<a href="" className="btn-outline px-6">
						ألغاء
						<XMarkIcon className="w-6 h-6"></XMarkIcon>
					</a>
				</Link>
			</header>
			<main>
				<div className="border-black border p-4 w-full bg-base drop-shadow rounded-md space-y-6">
					<div className="flex gap-4 w-full">
						<Input
							label="أسم العميل"
							type={"text"}
							onChange={(e) => setName(e.target.value)}
						></Input>
						<Input
							label="عنوان العميل"
							type={"text"}
							onChange={(e) => setClientAddress(e.target.value)}
						></Input>
						<Input
							label="أسم المشروع"
							type={"text"}
							onChange={(e) => setName(e.target.value)}
						></Input>
						<Input
							label="نسبة المكتب"
							type={"number"}
							onChange={(e) =>
								setOfficePrecentage(e.target.value)
							}
						></Input>
						<Input
							label="التاريخ"
							type={"date"}
							onChange={(e) => setDate(e.target.value)}
						></Input>
					</div>

					<div className="space-y-2">
						<h1 className="text-black font-bold text-xl">
							العاملين
						</h1>

						<table className="table-auto w-full border-2 border-secondary rounded-md">
							<thead className="bg-secondary">
								<tr>
									<th className="p-2 text-start whitespace-nowrap">
										العامل
									</th>
									<th className="p-2 text-start whitespace-nowrap">
										الراتب
									</th>
									<th className="p-2 text-start whitespace-nowrap">
										النسبة
									</th>
									<th className="p-2 text-start whitespace-nowrap">
										التاريخ
									</th>
									<th className="p-2 text-start whitespace-nowrap"></th>
								</tr>
							</thead>
							<tbody>
								{workers.map((worker) => {
									return (
										<tr>
											<td className="p-2">
												<Combobox
													data={dropdownWorkers}
													textField="name"
													inputProps={{ onchange: () => console.log("hi?") }}
													onChange={(
														selectedWorker: Worker,
													) =>
														updateWorker(
															worker.id,
															{
																...selectedWorker,
															},
														)
													}
												/>
											</td>
											<td className="p-2">
												<Input
													type={"number"}
													onChange={(e) =>
														updateWorker(
															worker.id,
															{
																project: {
																	salary: Number(
																		e.target
																			.value,
																	),
																},
															},
														)
													}
													placeholder={"الراتب"}
												></Input>
											</td>
											<td className="p-2">
												<Input
													type={"number"}
													onChange={(e) =>
														updateWorker(
															worker.id,
															{
																project: {
																	precentage:
																		Number(
																			e
																				.target
																				.value,
																		),
																},
															},
														)
													}
													placeholder={"النسبة"}
												></Input>
											</td>
											<td className="p-2">
												<Input
													type={"date"}
													onChange={(e) =>
														updateWorker(
															worker.id,
															{
																project: {
																	date: e
																		.target
																		.value,
																},
															},
														)
													}
													placeholder={"التاريخ"}
												></Input>
											</td>
											<td className="p-2 w-8">
												<button className="p-1.5 bg-red-500 rounded-md flex justify-center">
													<TrashIcon className=" text-white h-6 w-6"></TrashIcon>
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Public;
