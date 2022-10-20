import React, { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import Logo from "../public/images/logo.png";

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
import Link from 'next/link'
import DeleteWorkerButton from './DeleteWorkerButton'

interface IProps {
	readOnly?: boolean;
}

function ExpensesInputTable({ readOnly }: IProps) {
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
		removeSectionDropDown
	} = useStore((state) => state);

	useEffect(() => {
		if (!searchQuery) return setSearchResults(sections);
		const sectionsFuse = new Fuse<Section>(sections, { keys: ["name"] });
		setSearchResults(sectionsFuse.search(searchQuery).map((x) => x.item));
	}, [searchQuery, sections]);

	return (
		<>
			<div className="absolute inset-x-0 w-full top-14 bottom-0 grid place-items-center">
			<div className="drop-shadow-lg bg-base max-w-xs rounded-md border-2 gap-4 pb-16 w-full flex flex-col items-center p-4">
				<div className="flex flex-col items-center mb-4 ">
					<div className="w-36 h-36 ">
						<Image src={Logo} className=""></Image>
					</div>
					<h1 className="font-semibold text-xl mt-2">
						S.H Steel Construction
					</h1>
				</div>

				<form
					className="flex flex-col items-center gap-4"
				>   
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
																				<div className="flex row">
																				{selected && (
																					<span
																						className={`absolute px-12 inset-y-0 left-0 flex items-center  ${
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
																				
																				</div>
																			</>
																		)}
																	</Combobox.Option>
																),
															)}
														</Combobox.Options>
													</Transition>
												</div>
											</Combobox>
										</td>
										

					
									</tr>
								);
							})}
								{!expenses.length && (
						<div className="w-full flex justify-center py-2">
							لا يوجد مصروفات
						</div>
					)}
							<Link href={ `/preview/public/choose/worker`}>
                    <a>
                    <button disabled = {!expenses.length} className="btn-primary py-1" type="submit">
						سحب البند 
					</button>
                    </a>
                    </Link>
				</form>
			</div>
			</div>
						
							
				
		</>
	);
}

export default ExpensesInputTable;
