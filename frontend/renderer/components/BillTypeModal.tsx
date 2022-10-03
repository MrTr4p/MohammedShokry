import React, { useState } from "react";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AnimatePresence, motion } from "framer-motion";

function BillTypeModal() {
	const [value, setValue] = useState<string>();

	return (
		<AnimatePresence initial={true}>
			<Dialog.Root>
				<Dialog.Trigger className="btn-primary">
					<span>أضف فاتورة جديدة</span>
					<PlusIcon className="w-6 h-6"></PlusIcon>
				</Dialog.Trigger>
				<Dialog.Portal>
					<motion.div>
						<Dialog.Overlay className="bg-primary/25 z-50 fixed inset-0 grid place-items-center">
							<motion.div
								className="max-w-lg w-full"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								transition={{
									type: "spring",
									duration: 0.5,
								}}
							>
								<Dialog.Content className="bg-base p-6 rounded-md max-w-lg w-full space-y-4">
									<div className="flex items-start justify-between">
										<div>
											<Dialog.Title className="font-bold text-2xl">
												أضافة فاتورة جديدة
											</Dialog.Title>
											<Dialog.Description>
												أختر نوع الفاتورة
											</Dialog.Description>
										</div>
										<Dialog.Close>
											<XCircleIcon className="w-7 h-7 hover:bg-secondary-hover active:bg-secondary-active rounded-full transition"></XCircleIcon>
										</Dialog.Close>
									</div>

									<ToggleGroup.Root
										type="single"
										className="flex justify-between"
										onValueChange={(value) => {
											setValue(value);
										}}
									>
										{["1", "2", "3"].map((el) => {
											let selected = el == value;
											return (
												<ToggleGroup.Item
													key={el}
													value={el}
													className={`p-16 py-24 border-2 border-secondary group ${
														selected
															? "border-primary"
															: ""
													} rounded-md relative transition`}
												>
													{el}

													<AnimatePresence>
														{selected && (
															<motion.div
																className="absolute right-2 top-2 "
																initial={{
																	scale: 0,
																}}
																animate={{
																	scale: 1,
																}}
																exit={{
																	scale: 0,
																}}
																transition={{
																	duration: 0.3,
																	type: "spring",
																}}
															>
																<CheckCircleIcon className=" w-6 h-6 text-primary"></CheckCircleIcon>
															</motion.div>
														)}
													</AnimatePresence>
												</ToggleGroup.Item>
											);
										})}
									</ToggleGroup.Root>
									<div className="flex gap-2 w-full">
										<Dialog.Close className="btn-primary px-6">
											أكمل
										</Dialog.Close>
										<Dialog.Close className="btn-outline px-6">
											الغاء
										</Dialog.Close>
									</div>
								</Dialog.Content>
							</motion.div>
						</Dialog.Overlay>
					</motion.div>
				</Dialog.Portal>
			</Dialog.Root>
		</AnimatePresence>
	);
}

export default BillTypeModal;
