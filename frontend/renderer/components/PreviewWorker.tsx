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
import PreviewInput from "./PreviewInput";
import axios from "axios";
import CreateNewWorkerModal from "./CreateNewWorkerModal";
import TableDeleteButton from "./TableDeleteButton";
import DeleteWorkerButton from "./DeleteWorkerButton"
import Link from "next/link";
const electron = require('electron')

interface IProps {
	readOnly?: boolean;
}

function PreviewWorker({ readOnly = false }: IProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const {
		user,
		workers,
		dropdownWorkers,
		setDropdownWorkers,
		removeDropdownWorker,
		addWorker,
		updateWorker,
		removeWorker,
	} = useStore((state) => ({
		workers: state.workers,
		removeDropdownWorker:state.removeDropdownWorker,
		dropdownWorkers: state.dropdownWorkers,
		setDropdownWorkers: state.setDropdownWorkers,
		addWorker: state.addWorker,
		updateWorker: state.updateWorker,
		removeWorker: state.removeWorker,
		user: state.user,
	}));

	useEffect(() => {
		console.log('//')
		if (!(dropdownWorkers.length > 0)) {
			axios({
				url: "http://localhost:8000/api/get/all/worker",
			}).then(({ data }) => {
				console.log(data)
				setDropdownWorkers(data);
			});
			
		}
	}, []);

	useEffect(() => {
		const controller = new AbortController();

		axios({
			url:
				"http://localhost:3000/search/workers?query=" +
				encodeURIComponent(searchQuery),
			signal: controller.signal,
		}).then(({ data }) => {
			console.log(data);
			setDropdownWorkers(data.workers);
		});

		return () => controller.abort();
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
								{!readOnly && (
									<th className="p-2 text-start whitespace-nowrap"></th>
								)}
							</tr>
						</thead>
						<tbody className="bg-base">
							{workers.map((worker, workerNumber) => {
								return (
									<tr key={worker.rowId}>
										<td className="p-2">
                                        <PreviewInput
												disabled
												type={"name"}
												value={worker.name}
												
												placeholder={"اسم العامل"}
											></PreviewInput>
                                        </td>
                                    
										<td className="p-2">
                                     
											<PreviewInput
												disabled
												type={"number"}
												value={worker.project?.salary}
												
												placeholder={"الراتب"}
											></PreviewInput>
										</td>
										<td className="p-2">
											<PreviewInput
												disabled
												type={"number"}
												value={
													worker.project?.precentage
												}
												
												placeholder={"النسبة"}
											></PreviewInput>
										</td>
										<td className="p-2">
											<PreviewInput
												disabled
												type={"date"}
												value={worker.project?.date}
												
												placeholder={"التاريخ"}
											></PreviewInput>
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
				</div>
			</div>
		</>
	);
}

export default PreviewWorker;
