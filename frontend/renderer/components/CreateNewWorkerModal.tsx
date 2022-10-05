import React, { useRef, useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Input from "./Input";
import { useStore } from "../store";

function CreateNewWorkerModal({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (status: boolean) => void;
}) {
	const newDropdownWorker = useStore((state) => state.newDropdownWorker);
	const [errors, setErrors] = useState({ work: "", name: "" });
	const [infoMessage, setInfoMessage] = useState({
		message: "",
		error: false,
	});

	const workerNameInput = useRef();
	const workerWorkInput = useRef();

	function handleWorkerCreate() {
		const errs = { name: "", work: "" };
		const nameInput = workerNameInput.current as any;
		const workInput = workerWorkInput.current as any;
		const newWorker = {
			name: nameInput.value,
			work: workInput.value,
		};

		if (!newWorker.name) errs.name = "يجب ملئ أسم العامل";
		if (!newWorker.work) errs.work = "يجب ملئ هذه وظيفة العامل";

		if (errs.name || errs.work) {
			return setErrors(errs);
		} else {
			setErrors(errs);
		}

		newDropdownWorker(newWorker)
			.then(() => {
				setInfoMessage({
					message: "تم حفظ العامل بنجاح",
					error: false,
				});

				setTimeout(() => {
					setOpen(false);
					resetState();
				}, 500);
			})
			.catch(() =>
				setInfoMessage({ message: "حدث خطأ ما", error: true }),
			);
	}

	function resetState() {
		setInfoMessage({ message: "", error: false });
		setErrors({ work: "", name: "" });
	}

	return (
		<div>
			<AlertDialog.Root open={open} onOpenChange={setOpen}>
				<AlertDialog.Portal>
					<AlertDialog.Overlay className="fixed inset-0 bg-primary/25 z-50 grid place-items-center">
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
							<AlertDialog.Content className="bg-base p-6 rounded-md max-w-lg w-full space-y-4">
								<div>
									<AlertDialog.Title className="font-bold text-2xl flex justify-between w-full">
										أضافة عامل جديد
										<AlertDialog.Cancel>
											<XCircleIcon className="w-7 h-7 hover:bg-secondary-hover active:bg-secondary-active rounded-full transition"></XCircleIcon>
										</AlertDialog.Cancel>
									</AlertDialog.Title>
									<AlertDialog.Description>
										أملئ معلومات العامل
									</AlertDialog.Description>
								</div>

								<div className="space-y-2">
									<Input
										iref={workerNameInput}
										label={"أسم العامل"}
										type={"text"}
										placeholder="أملئ اسم العامل"
										error={errors.name}
										required={true}
									></Input>
									<Input
										iref={workerWorkInput}
										label={"وظيفة العامل"}
										type={"text"}
										placeholder="أملئ وظيفة العامل"
										error={errors.work}
										required={true}
									></Input>
								</div>

								<div className="flex gap-2 items-center">
									<button
										onClick={handleWorkerCreate}
										className="btn-primary"
									>
										حفظ
									</button>
									<AlertDialog.Cancel
										onClick={resetState}
										className="btn-outline"
									>
										ألغاء
									</AlertDialog.Cancel>
									{infoMessage.message && (
										<h1
											className={`font-bold text-center text-lg ${
												infoMessage.error
													? "text-red-600"
													: "text-green-600"
											}`}
										>
											{infoMessage.message}
										</h1>
									)}
								</div>
							</AlertDialog.Content>
						</motion.div>
					</AlertDialog.Overlay>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		</div>
	);
}

export default CreateNewWorkerModal;
