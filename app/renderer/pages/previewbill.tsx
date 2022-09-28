import React, { useState } from "react";
import Head from "next/head";
import tw from "tailwind-styled-components";
import { StarIcon } from "@heroicons/react/24/solid";
import { PrinterIcon } from "@heroicons/react/24/outline";
import Modal from "../components/PrintModel";
import { AnimatePresence } from "framer-motion";
import { GetServerSideProps } from "next";
import axios from "axios";

function preview(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const Header = tw.h1`text-5xl font-bold text-black`;
  const revenues = props.revenues;
  const expenses = props.expenses;
  const workers = props.worker;
  const mainInputs = props.main;

  return (
    <>
      <Head>
        <title>Create New</title>
      </Head>
      <main className="space-y-12">
        <div className="flex justify-between items-start print:hidden">
          <div className="flex flex-col items-start gap-2">
            <Header>شكل الفاتورة</Header>
          </div>

          <button
            onClick={() => {
              setModalOpen(true);
            }}
            className="z-0 bg-primary drop-shadow-lg text-white border-white border-2 text-2xl font-semibold flex items-center gap-2 px-4 py-2 rounded-md hover:bg-primary/70 active:bg-primary/80 transition"
          >
            <span>طباعة</span>
            <PrinterIcon className="h-8 w-8 text-white"></PrinterIcon>
          </button>
          <AnimatePresence>
            {modalOpen && <Modal setOpenModal={setModalOpen} />}
          </AnimatePresence>
        </div>

        <div className="bg-base shadow-lg border  border-black p-5  rounded-md print:absolute print:inset-0">
          <div className=" divide-y-2">
            <div className=" grid-cols-5 mx-auto">
              <div key={mainInputs.name} className=" flex gap-4 py-4 mx-auto">
                <span className="mx-auto">
                  <label className="flex row font-bold text-lg">
                    اسم العميل
                  </label>
                  {mainInputs.name}
                </span>
                <span className="mx-auto">
                  <label className="flex row font-bold text-lg">
                    اسم المشروع
                  </label>
                  {mainInputs.projectName}
                </span>
                <span className="mx-auto">
                  <label className="flex row font-bold text-lg">مهنة</label>
                  {mainInputs.adress}
                </span>
                <span className="mx-auto">
                  <label className="flex row font-bold text-lg">التاريخ</label>
                  {mainInputs.date}
                </span>
              </div>
            </div>
          </div>
          <div className="py-10 outline-dashed outline-[1px] my-10">
            <label className=" text-2xl font-bold mx-2">العاملين</label>

            {workers.map((worker) => (
              <div className=" grid-cols-5	mx-auto	">
                <div key={worker.id} className=" flex gap-4 py-4 mx-2">
                  <span className="font-bold flex row mt-2">
                    <StarIcon className="h-2 w-2 mt-2"></StarIcon>
                    {worker.id}
                  </span>
                  <span className="mx-auto ">
                    <label className="flex row font-bold text-lg ">
                      اسم العامل
                    </label>
                    {worker.workerName}
                  </span>
                  <span className="mx-auto">
                    <label className="flex row font-bold text-lg">العمل</label>
                    {worker.work}
                  </span>
                  <span className="mx-auto">
                    <label className="flex row font-bold text-lg">
                      التاريخ
                    </label>
                    {worker.date}
                  </span>
                  <span className="mx-auto">
                    <label className="flex row font-bold text-lg">المبلغ</label>
                    {worker.salary}
                  </span>
                  <span className="mx-auto">
                    <label className="flex row font-bold text-lg">النسبة</label>
                    {worker.precentage}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="py-10 outline-dashed outline-[1px] my-10">
            <label className=" text-2xl font-bold mx-2">المصروفات</label>

            {expenses.map((expense) => (
              <div className="grid-cols-5">
                <div key={expense.id} className=" flex gap-4 py-4 ">
                  <span className="font-bold flex row mt-2 mx-2">
                    <StarIcon className="h-2 w-2 mt-2"></StarIcon>
                    {expense.id}
                  </span>
                  <span className="mx-auto">
                    <label className="flex row font-bold text-lg">
                      اسم المادة
                    </label>
                    {expense.materialName}
                  </span>
                  <span className="mx-auto">
                    <label className="flex row font-bold text-lg">اليوم</label>
                    {expense.day}
                  </span>
                  <span className="mx-auto">
                    <label className="flex row font-bold text-lg">
                      التاريخ
                    </label>
                    {expense.date}
                  </span>
                  <span className="mx-auto">
                    <label className="flex row font-bold text-lg">
                      المبلغ الكامل
                    </label>
                    {expense.totalcost}
                  </span>
                  <span className="mx-auto">
                    <label className="flex row font-bold text-lg">
                      رقم الفاتورة
                    </label>
                    {expense.billcode}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="outline-dashed py-10 outline-[1px] my-10">
            <label className=" text-2xl font-bold mx-2">ألايرادات</label>

            <div className='"mx-auto'>
              {revenues.map((revenue) => (
                <div className="flex row">
                  <div key={revenue.id} className=" flex gap-4 py-4 ">
                    <span className="font-bold flex row mt-2 mx-2">
                      <StarIcon className="h-2 w-2 mt-2"></StarIcon>
                      {revenue.id}
                    </span>
                    <span className="mx-16">
                      <label className="flex row font-bold text-lg">
                        الكمية
                      </label>
                      {revenue.amount}
                    </span>
                    <span className="mx-16">
                      <label className="flex row font-bold text-lg">
                        التاريخ
                      </label>
                      {revenue.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { billName } = context.query as any;

  const { data } = await axios({
    url: `http://localhost:3000/bill/get/${encodeURIComponent(billName)}`,
  });
  return {
    props: {
      main: {
        name: data.bill.clientName,
        adress: data.bill.clientAddress,
        projectName: data.bill.name,
        date: data.bill.date,
      },
      worker: data.workers.map((worker) => {
        return {
          id: worker.id,
          workerName: worker.workerName,
          work: worker.work,
          date: worker.date,
          salary: worker.salary,
          precentage: worker.precentage,
        };
      }),
      expenses: data.expenses.map((expense) => {
        return {
          id: expense.id,
          materialName: expense.materialName,
          totalcost: expense.totalcost,
          date: expense.date,
          day: expense.day,
          billcode: expense.billCode,
        };
      }),
      revenues: data.revenues.map((revenue) => {
        return {
          id: revenue.id,
          amount: revenue.amount,
          date: revenue.date,
        };
      }),
    }, // will be passed to the page component as props
  };
};
export default preview;
