import React, { useEffect, useRef } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";

import NormalBill from "../public/images/logo.png";
import { AnimatePresence, motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

function useOutsideAlerter(ref: any, callback: any) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				callback("You clicked outside of me!");
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
}

function DropDown({ open, setOpen }) {
	const dropDownRef = useRef();
	useOutsideAlerter(dropDownRef, () => setOpen(false));

	return (
		<motion.ul
			initial={{ scale: 0.5, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0, opacity: 0 }}
			transition={{ duration: 0.15 }}
			className={`absolute bg-white space-y-4 p-4 rounded outline outline-1 top-14 left-0 right-0`}
			ref={dropDownRef}
		>
			<li className="">
				<button className="w-3/5 mx-auto bg-white outline outine-1 outine-primary text-primary text-g font-semibold flex items-center gap-2 px-4 py-1 rounded-md hover:bg-primary/10 active:bg-primary/20 transition">
					<span className="flex row mx-auto">فاتورة مجمعية</span>
				</button>
			</li>
			<li className="">
				<button className=" w-3/5 mx-auto bg-white outline outine-1 outine-primary text-primary text-g font-semibold flex items-center gap-2 px-4 py-1 rounded-md hover:bg-primary/10 active:bg-primary/20 transition">
					<span className="mx-auto">فاتورة تفصيلية</span>
				</button>
			</li>
			<li className="">
				<button className="w-3/5 mx-auto bg-white outline outine-1 outine-primary text-primary text-g font-semibold flex items-center gap-2 px-4 py-1 rounded-md hover:bg-primary/10 active:bg-primary/20 transition">
					<span className="mx-auto">فاتورة عامل</span>
				</button>
			</li>
		</motion.ul>
	);
}

export default DropDown;
