import React from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { DocumentIcon } from "@heroicons/react/24/outline";

import NormalBill from "../public/images/logo.png";

import Image from "next/image";

function Modal({ setOpenModal }) {
	return (
		<div className="fixed z-50 inset-0 bg-black/50 grid place-items-center">
			<div className="bg-base max-w-2xl w-full p-6 rounded">
				<div className=" flex justify-between">
					<h1 className="font-bold text-2xl"> اضافة فاتورة جديدة</h1>
					<XCircleIcon
						onClick={() => {
							setOpenModal(false);
						}}
						className="h-61 w-6 cursor-pointer"
					></XCircleIcon>
				</div>
				<div className="my-1">
					<h1>اختار نوع الفاتورة</h1>
				</div>
				<div className="flex justify-between mx-16 mt-8 mb-8">
					<div>
                        <button className="focus:outline-none hover:outline-dashed focus:ring focus:ring-primary">
                        <DocumentMagnifyingGlassIcon className="w-40 h-40"></DocumentMagnifyingGlassIcon>
				
                        </button>
                   		<h1 className="mr-10">فاتورة عامة</h1>
					</div>

					<div>
						<button className="focus:outline-none hover:outline-dashed focus:ring focus:ring-primary">
                        <DocumentIcon className="w-40 h-40"></DocumentIcon>
                        </button>
						<h1 className="mr-10">فاتورة اخرى</h1>
					</div>
				</div>
				<div className="flex justify-start mt-4">
					<button className=" mx-4 bg-primary drop-shadow-lg text-white text-xl font-semibold flex items-center gap-2 px-2 py-1 rounded-md hover:bg-primary/80 active:bg-primary transition">
						اكمل
					</button>
					<button
						className=" mx-4 bg-white drop-shadow-lg text-primary text-xl font-semibold flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/10 active:bg-white/5 transition"
						onClick={() => {
							setOpenModal(false);
						}}
					>
						الغاء
					</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
