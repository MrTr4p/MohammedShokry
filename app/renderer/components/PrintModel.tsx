import React, { useEffect, useRef } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { DocumentIcon } from "@heroicons/react/24/outline";

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

function Modal({ setOpenModal }) {
  const modalRef = useRef();
  useOutsideAlerter(modalRef, () => setOpenModal(false));
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
            <h1 className="font-bold text-2xl">اختار نوع الطباعة</h1>
            <XCircleIcon
              onClick={() => {
                setOpenModal(false);
              }}
              className="h-8 w-8 cursor-pointer"
            ></XCircleIcon>
          </div>
          <div className="flex justify-between  mb-8 gap-20"></div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
