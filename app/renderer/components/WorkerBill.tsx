import React, { useEffect, useRef } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { PrinterIcon } from "@heroicons/react/24/outline";

import LogoPng from '../public/images/logo.png'
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

function WorkerBill({ setOpenModal2 }) {
  const modalRef = useRef();
  useOutsideAlerter(modalRef, () => setOpenModal2(false));
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed z-50 inset-0 bg-primary/25 grid place-items-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <div className="bg-base p-6 rounded" ref={modalRef}>
          <div className="flex justify-between items-center">
          <div className="bg-base p-6 rounded " ref={modalRef}>
          <div className=" justify-between items-center">
            <div className="justify-center flex">
            <Image src={LogoPng}></Image>
            </div>
           <span className=" my-3 w-80 font-bold text-xl flex justify-center">اسم العامل</span>
           <input 							className="border border-dashed p-2 bg-base border-black focus:outline-primary rounded-md w-full print:border-0 h-10 px-2"
></input>
          </div>
          <div className="flex justify-center mt-4">

            <button
            						className="bg-primary drop-shadow-lg text-white text-2xl font-semibold flex items-center gap-2 px-4 py-2 rounded-md hover:bg-primary/80 active:bg-primary transition"

            >
                اطبع
                <PrinterIcon className="w-5 h-5 mt-1"></PrinterIcon>

                </button>
               
          </div>
        </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default WorkerBill;
