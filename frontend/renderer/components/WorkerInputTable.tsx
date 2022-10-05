import React, { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
	CheckIcon,
	ChevronUpDownIcon,
	PlusIcon,
	TrashIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { useStore, Worker } from "../store";
import Input from "./Input";
import axios from "axios";
import CreateNewWorkerModal from "./CreateNewSectionModal";
import TableDeleteButton from "./TableDeleteButton";

function WorkerInputTable() {
	const [searchQuery, setSearchQuery] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const {
		workers,
		dropdownWorkers,
		setDropdownWorkers,
		addWorker,
		updateWorker,
		removeWorker,
	} = useStore((state) => ({
		workers: state.workers,
		dropdownWorkers: state.dropdownWorkers,
		setDropdownWorkers: state.setDropdownWorkers,
		addWorker: state.addWorker,
		updateWorker: state.updateWorker,
		removeWorker: state.removeWorker,
	}));

	useEffect(() => {
		if (!(dropdownWorkers.length > 0)) {
			axios({
				url: "http://localhost:3000/search/workers/get",
			}).then(({ data }) => {
				setDropdownWorkers(data);
			});
		}
	}, []);

	useEffect(() => {
		if (!searchQuery) return;
		let searchDebounce = setTimeout(
			() =>
				axios({
					url:
						"http://localhost:3000/search/workers?query=" +
						encodeURIComponent(searchQuery),
				}).then(({ data }) => {
					console.log(data);
					setDropdownWorkers(data.workers);
				}),
			350,
		);

		return () => clearTimeout(searchDebounce);
	}, [searchQuery]);

	return (
		<>
			<CreateNewWorkerModal
				open={modalOpen}
				setOpen={setModalOpen}
			></CreateNewWorkerModal>
			<div className="space-y-2">
				<h1 className="text-black font-bold text-xl">العاملين</h1>

				<div className="border-2 border-secondary rounded-md">
					<table className="table-auto w-full">
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
						<tbody className="bg-base">
							{workers.map((worker, workerNumber) => {
								return (
									<tr key={worker.id}>
										<td className="p-2">
											<Combobox
												by={"id"}
												value={worker}
												onChange={(
													selected: Worker,
												) => {
													updateWorker(
														worker.id,
														selected,
													);
												}}
											>
												<div className="relative mt-1.5">
													<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none">
														<Combobox.Input
															className="pl-8 border-gray-400 border-2 border-dashed w-full h-9 focus:outline-none focus:border-primary focus:border-solid py-1 px-2 rounded-md transition"
															onChange={(e) =>
																setSearchQuery(
																	e.target
																		.value,
																)
															}
															displayValue={(
																worker: Worker,
															) => worker?.name}
														/>

														<Combobox.Button className="absolute inset-y-0 left-1 flex items-center">
															<ChevronUpDownIcon
																className="h-6 w-6 text-primary"
																aria-hidden="true"
															/>
														</Combobox.Button>
													</div>

													<Transition
														as={Fragment}
														enter="transition ease-out duration-100"
														enterFrom="transform opacity-0 scale-95"
														enterTo="transform opacity-100 scale-100"
														leave="transition ease-in duration-75"
														leaveFrom="transform opacity-100 scale-100"
														leaveTo="transform opacity-0 scale-95"
													>
														<Combobox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white pt-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
															{dropdownWorkers
																.filter(
																	(worker) =>
																		!workers.some(
																			(
																				newBillWorker,
																			) =>
																				newBillWorker.id ===
																				worker.id,
																		),
																)
																.map(
																	(
																		worker,
																	) => (
																		<Combobox.Option
																			key={
																				worker.id
																			}
																			className={({
																				selected,
																				active,
																			}) =>
																				`relative cursor-default select-none py-2 my-0.5 pl-10 pr-4 rounded-md ${
																					selected
																						? "bg-primary text-white"
																						: active
																						? "bg-primary-hover text-white"
																						: "text-gray-900"
																				}`
																			}
																			value={
																				worker
																			}
																		>
																			{({
																				selected,
																				active,
																			}) => (
																				<>
																					<span
																						className={`block truncate ${
																							selected
																								? "font-medium"
																								: "font-normal"
																						}`}
																					>
																						{
																							worker.name
																						}
																					</span>
																					{selected && (
																						<span
																							className={`absolute px-3 inset-y-0 left-0 flex items-center  ${
																								selected
																									? "text-white"
																									: "text-primary"
																							}`}
																						>
																							<CheckIcon
																								className="h-5 w-5"
																								aria-hidden="true"
																							/>
																						</span>
																					)}
																				</>
																			)}
																		</Combobox.Option>
																	),
																)}
															<div className="m-2">
																<button
																	className="btn-primary w-full "
																	onClick={() =>
																		setModalOpen(
																			true,
																		)
																	}
																>
																	أضف عامل
																	جديد
																</button>
															</div>
														</Combobox.Options>
													</Transition>
												</div>
											</Combobox>
										</td>
										<td className="p-2">
											<Input
												type={"number"}
												value={worker.project?.salary}
												onChange={(e) =>
													updateWorker(worker.id, {
														project: {
															salary: Number(
																e.target.value,
															),
														},
													})
												}
												placeholder={"الراتب"}
											></Input>
										</td>
										<td className="p-2">
											<Input
												type={"number"}
												value={
													worker.project?.precentage
												}
												onChange={(e) =>
													updateWorker(worker.id, {
														project: {
															precentage: Number(
																e.target.value,
															),
														},
													})
												}
												placeholder={"النسبة"}
											></Input>
										</td>
										<td className="p-2">
											<Input
												type={"date"}
												value={worker.project?.date}
												onChange={(e) =>
													updateWorker(worker.id, {
														project: {
															date: e.target
																.value,
														},
													})
												}
												placeholder={"التاريخ"}
											></Input>
										</td>
										<td className="p-2 w-8">
											<TableDeleteButton
												onClick={() =>
													removeWorker(worker.id)
												}
											></TableDeleteButton>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					{!workers.length && (
						<div className="w-full flex justify-center py-2">
							لا يوجد عمال
						</div>
					)}
					<div className="m-2">
						<button
							className="w-full btn-outline py-1"
							onClick={() => addWorker()}
						>
							<PlusIcon className="w-6 h-6"></PlusIcon>
							أضف حقل جديد
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default WorkerInputTable;
