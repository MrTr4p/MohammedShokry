import Image from "next/image";
import Logo from "../public/images/logo.png";

import { useRouter } from "next/router";
import React, { useEffect, useRef, useState, Fragment } from "react";
import ChooseWorkerInput from "./ChooseWorkerInput";
import { useStore, Section } from "../store";
import Input from "./Input";
import axios from "axios";
import CreateNewWorkerModal from "./CreateNewWorkerModal";
import TableDeleteButton from "./TableDeleteButton";
import DeleteWorkerButton from "./DeleteWorkerButton"
import Link from "next/link";
import { Combobox, Transition } from "@headlessui/react";
import {
	CheckIcon,
	ChevronUpDownIcon,
	PlusIcon,
	TrashIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { Console } from "console";

interface IProps {
	readOnly?: boolean;
}


function WorkerPicker(billId,  { readOnly = false }: IProps) {
	const BillId = billId.billId.billData
	const login = useStore((state) => state.login);
	const passwordRef = useRef();
	const router = useRouter();
	let nameWorker : string;
	let idWorker : string;
	let workera : string;
    const [searchQuery, setSearchQuery] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const {
		user,
		workers,
		dropdownWorkers,
		setDropdownWorkers,

	} = useStore((state) => ({
		workers: state.workers,
		dropdownWorkers: state.dropdownWorkers,
		setDropdownWorkers: state.setDropdownWorkers,
		user: state.user,
	}));

	useEffect(() => {
		console.log('//')
		if (!(dropdownWorkers.length > 0)) {
			axios({
				url: "http://localhost:3000/search/workers/get",
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

	const [info, setInfo] = useState({ message: "", error: false });

	return (
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
							
									<tr >
										<td className="p-2">
											<Combobox
												disabled={readOnly}
												by={"id"}											
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
																//@ts-ignore
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
														<Combobox.Options className="z-50 absolute px-2 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white pt-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
															{workers.map(
																(worker) => (
																	<div>
																		<Link href={`/preview/public/choose/workerpicker?name=${worker.name}&id=${BillId}`}>
																			<a>
																	<Combobox.Option
																		
																		key={
																			worker.rowId
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
																			
																				<div className="flex">
																				<span
																					className={`block truncate ${
																						selected
																							? "font-medium"
																							: "font-normal"
																					}`}
																				>
																				
																					
																					{worker.name}
																					
																				
																					
																					
																				</span>
																				
																				</div>
																				
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
																	</a>
													</Link>
																	</div>	
																																),
															)}
															
														</Combobox.Options>
													</Transition>
												
												</div>
											</Combobox>
										</td>
										
									</tr>
									
							
                    	{!workers.length && (
						<div className="w-full flex justify-center py-2">
							لا يوجد عمال
						</div>
					)}
					
				
                   
                    
				</form>
			</div>
		</div>
	);
}

export default WorkerPicker;
