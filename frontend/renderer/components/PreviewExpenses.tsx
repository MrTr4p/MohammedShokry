import React, { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
	CheckIcon,
	ChevronUpDownIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import { Section, useStore, Worker } from "../store";
import PreviewInput from "./PreviewInput";
import CreateNewWorkerModal from "./CreateNewSectionModal";
import TableDeleteButton from "./TableDeleteButton";
import Fuse from "fuse.js";
import Link from 'next/link'
import DeleteWorkerButton from './DeleteWorkerButton'

interface IProps {
	readOnly?: boolean;
}

function PreviewExpenses({ readOnly }: IProps) {
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
									اليوم
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
											<PreviewInput
												disabled
												type={"text"}
												value={expense.section.name}
												
												placeholder={"البند"}
											></PreviewInput>
										</td>
										<td className="p-2">
											<PreviewInput
												disabled
												type={"text"}
												value={expense.materialName}
												
												placeholder={"البيان"}
											></PreviewInput>
										</td>
										<td className="p-2">
											<PreviewInput
												disabled
												type={"number"}
												value={expense.totalcost}
												
												placeholder={"السعر الكلى"}
											></PreviewInput>
										</td>
										<td className="p-2">
											<PreviewInput
												disabled
												type={"text"}
												value={expense.day}
												
												placeholder={"اليوم"}
											></PreviewInput>
										</td>
										<td className="p-2">
											<PreviewInput
												disabled
												type={"date"}
												value={expense.date}
												
												placeholder={"التاريخ"}
											></PreviewInput>
										</td>

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
				</div>
			</div>
		</>
	);
}

export default PreviewExpenses;
