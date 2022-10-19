import React, { useEffect, useState } from "react";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

function ConfirmDeleteModal({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (status: boolean) => void;
}) {

	return (
		<AnimatePresence initial={true}>
			<Dialog.Root open={open} onOpenChange={setOpen}>
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
												تأكيد عملية الحذف
											</Dialog.Title>
											<Dialog.Description>
												هل تريد حقا حذف هذه الفاتورة
											</Dialog.Description>
										</div>
										<Dialog.Close>
											<XCircleIcon className="w-7 h-7 hover:bg-secondary-hover active:bg-secondary-active rounded-full transition"></XCircleIcon>
										</Dialog.Close>
									</div>

									<div className="flex gap-2 w-full">
										
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

export default ConfirmDeleteModal;
