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

function AggregateBillTable({ readOnly }: IProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<Section[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const {
		user,
		addExpense,
		sections,
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
				<h1 className="text-black font-bold text-xl">المجمعية</h1>

				<div className="border-2 border-secondary rounded-md">
					<table className="table-auto w-full">
						<thead className="bg-secondary">
							<tr>
								<th className="p-2 text-start whitespace-nowrap">
									اسم 
								</th>
								<th className="p-2 text-start whitespace-nowrap">
									المبلغ الكلي
								</th>
								{!readOnly && (
									<th className="p-2 text-start whitespace-nowrap"></th>
								)}
							</tr>
						</thead>
						<tbody className="bg-base">
                                    
						</tbody>
					</table>
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

export default AggregateBillTable;
