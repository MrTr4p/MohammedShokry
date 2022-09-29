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

function AggBill({ setModalOpen }) {
  const modalRef = useRef();
  useOutsideAlerter(modalRef, () => setModalOpen(false));
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
            <h1 className="font-bold text-2xl">اضافة فاتورة جديدة</h1>
            <XCircleIcon
              onClick={() => {
                setModalOpen(false);
              }}
              className="h-8 w-8 cursor-pointer"
            ></XCircleIcon>
          </div>
          <div className="my-4 mt-6">
            <h1>اختار نوع الفاتورة</h1>
          </div>
          <div className="flex justify-between  mb-8 gap-20">
            <Link href="/create">
              <a>
                <button className="focus:outline-none outline outline-1 rounded-md focus:ring focus:ring-primary hover:outline-primary transition">
                  <DocumentMagnifyingGlassIcon className="w-40 h-40"></DocumentMagnifyingGlassIcon>
                </button>
                <h1 className="text-center">فاتورة عامة</h1>
              </a>
            </Link>
            <Link href="/create-another-bill">
              <a>
                <button className="focus:outline-none outline outline-1 rounded-md focus:ring focus:ring-primary hover:outline-primary transition">
                  <DocumentIcon className="w-40 h-40"></DocumentIcon>
                </button>
                <h1 className="text-center">فاتورة اخرى</h1>
              </a>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AggBill;
