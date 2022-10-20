import React, { useState } from "react";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

function BillPrintTypeModal({ id }: { id: number }) {
	const [value, setValue] = useState<"default" | "detaild" | "aggregate">(
		"default",
	);

	return (
		<AnimatePresence initial={true}>
			<Dialog.Root>
				<Dialog.Trigger className="btn-primary px-6">
					<span>طبع</span>
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
												طباعة
											</Dialog.Title>
											<Dialog.Description>
												أختر نوع الفاتورة المارد طبعها
											</Dialog.Description>
										</div>
										<Dialog.Close>
											<XCircleIcon className="w-7 h-7 hover:bg-secondary-hover active:bg-secondary-active rounded-full transition"></XCircleIcon>
										</Dialog.Close>
									</div>

									<ToggleGroup.Root
										type="single"
										className="flex gap-2 justify-between"
										onValueChange={(value) => {
											if (value) setValue(value as any);
										}}
									>
										{[
											{ en: "revenues", ar: "تفصيلية" },
											{ en: "aggregate", ar: "مجمعية" },
											{ en: "worker", ar: "عمال" },
										].map((el) => {
											let selected = el.en == value;
											return (
												<ToggleGroup.Item
													key={el.en}
													value={el.en}
													className={`w-full py-24 border-2 border-secondary group ${
														selected
															? "border-primary"
															: ""
													} rounded-md relative transition`}
												>
													{el.ar}
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
										<Link
											href={
												value
													? `/preview/public/${value}?id=${id}`
													: "/"
											}
										>
											<a
												href={
													value
														? `/preview/public/${value}?id=${id}`
														: "/"
												}
											>
												<Dialog.Close className="btn-primary px-6 h-full">
													أكمل
												</Dialog.Close>
											</a>
										</Link>
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

export default BillPrintTypeModal;
