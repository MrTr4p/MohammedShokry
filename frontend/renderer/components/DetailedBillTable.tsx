import React, { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
	CheckIcon,
	ChevronUpDownIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import { Section, useStore, Worker } from "../store";
import Input from "./Input";
import CreateNewWorkerModal from "./CreateNewSectionModal";
import TableDeleteButton from "./TableDeleteButton";
import Fuse from "fuse.js";

interface IProps {
	readOnly?: boolean;
}

function DetailedBillTable({ readOnly }: IProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<Section[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const {
		user,
		expenses,
		addExpense,
		updateExpense,
		removeExpense,
		sections,
		addSection,
	} = useStore((state) => state);

	useEffect(() => {
		if (!searchQuery) return setSearchResults(sections);
		const sectionsFuse = new Fuse(sections, { keys: ["name"] });
		setSearchResults(sectionsFuse.search(searchQuery).map((x) => x.item));
	}, [searchQuery, sections]);

	return (
		<>
			<CreateNewWorkerModal
				open={modalOpen}
				setOpen={setModalOpen}
			></CreateNewWorkerModal>
			<div className="space-y-2">
				<h1 className="text-black font-bold text-xl">المصروفات</h1>

				<div className="border-2 border-secondary rounded-md">
					<table className="table-auto w-full">
						<thead className="bg-secondary">
							<tr>
								<th className="p-2 text-start whitespace-nowrap">
									البند
								</th>
								<th className="p-2 text-start whitespace-nowrap">
									البيان
								</th>
								<th className="p-2 text-start whitespace-nowrap">
									السعر الكلى
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
							{expenses.map((expense) => {
								return (
									<tr key={expense.id}>
										<td className="p-2">
											<Combobox
												disabled={readOnly}
												by={"id"}
												value={expense.section}
												onChange={(selected: any) => {
													updateExpense(expense.id, {
														section: selected,
													});
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
																expense: Worker,
															) => expense?.name}
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
														<Combobox.Options className="z-50 absolute mt-1 max-h-60 w-full px-2 overflow-auto rounded-md bg-white pt-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
															{searchResults.map(
																(section) => (
																	<Combobox.Option
																		key={
																			section.id
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
																			section
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
																						section.name
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
															<div className="my-2">
																<button
																	disabled={
																		user.accountType !==
																		"edit"
																	}
																	className="btn-primary w-full "
																	onClick={() =>
																		setModalOpen(
																			true,
																		)
																	}
																>
																	أضف بند جديد
																</button>
															</div>
														</Combobox.Options>
													</Transition>
												</div>
											</Combobox>
										</td>
										<td className="p-2">
											<Input
												disabled={readOnly}
												type={"text"}
												value={expense.materialName}
												onChange={(e) =>
													updateExpense(expense.id, {
														materialName:
															e.target.value,
													})
												}
												placeholder={"البيان"}
											></Input>
										</td>
										<td className="p-2">
											<Input
												disabled={readOnly}
												type={"number"}
												value={expense.totalcost}
												onChange={(e) =>
													updateExpense(expense.id, {
														totalcost: Number(
															e.target.value,
														),
													})
												}
												placeholder={"السعر الكلى"}
											></Input>
										</td>

										<td className="p-2">
											<Input
												disabled={readOnly}
												type={"date"}
												value={expense.date}
												onChange={(e) =>
													updateExpense(expense.id, {
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
														removeExpense(
															expense.id,
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
					{!expenses.length && (
						<div className="w-full flex justify-center py-2">
							لا يوجد مصروفات
						</div>
					)}
					{!readOnly && (
						<div className="m-2">
							<button
								className="w-full btn-outline py-1"
								onClick={() => addExpense("")}
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

export default DetailedBillTable;
