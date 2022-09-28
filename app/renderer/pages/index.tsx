import React, { useState } from "react";
import Head from "next/head";
import tw from "tailwind-styled-components";
import { PlusIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Modal from "../components/Modal";
import { AnimatePresence } from "framer-motion";
import { GetServerSideProps } from "next";
import { useTable } from "react-table";

function Home({
  homeBills,
  billsType,
}: {
  homeBills: any[];
  billsType: "public" | "office";
}) {
  const Header = tw.h1`text-5xl font-bold text-black`;
  const SubHeader = tw.h1`text-xl text-black`;
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  async function getSearch(event) {
    event.preventDefault();
    setSearchResult((state) => []);
    const { data } = await axios({
      url: `http://localhost:3000/home/search/${search}`,
    });
    setSearchResult((state) => [
      ...state,
      ...data.map((row) => {
        return {
          ...row,
          inReturn: row?.inReturn || "",
          totalCost: row?.totalCost || "",
          totalWorkers: row?._count?.workers || 0,
          projectStatus: row?.projectStatus ? "مدفوع" : "معلق",
        };
      }),
    ]);
  }

  const homeBillsData = React.useMemo(
    () => (searchResult.length > 0 ? searchResult : homeBills),
    [homeBills, searchResult]
  );
  const homeBillsColumn = React.useMemo(
    () => [
      ...(billsType === "public"
        ? [
            { Header: "اسم المشروع", accessor: "name" },
            { Header: "رقم الفاتورة", accessor: "id" },
            { Header: "التاريخ", accessor: "date" },
            { Header: "عدد العمال", accessor: "totalWorkers" },
            { Header: "السعر الكلى", accessor: "totalCost" },
            { Header: "الحالة", accessor: "projectStatus" },
          ]
        : [
            { Header: "رقم الفاتورة", accessor: "id" },
            { Header: "مقابل", accessor: "inReturn" },
            { Header: "التاريخ", accessor: "date" },
            { Header: "المبلغ", accessor: "totalCost" },
          ]),
    ],
    [billsType]
  );
  console.log(homeBills);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: homeBillsColumn,
      data: homeBillsData,
    });

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className="space-y-12">
        <div className="flex justify-between items-start">
          <div className="flex flex-col items-start gap-2">
            <Header>الفواتير</Header>
            <SubHeader>
              كلام كتيييييييييييييييييييييييييييييييييييييييييييييييييييير
            </SubHeader>
          </div>

          <button
            className="bg-primary drop-shadow-lg text-white text-2xl font-semibold flex items-center gap-2 px-4 py-2 rounded-md hover:bg-primary/80 active:bg-primary transition"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <span>أضف فاتورة</span>
            <PlusIcon className="h-8 w-8"></PlusIcon>
          </button>

          <AnimatePresence>
            {modalOpen && <Modal setOpenModal={setModalOpen} />}
          </AnimatePresence>
        </div>

        <form
          className="flex row outline rounded-md outline-1"
          onSubmit={(e) => getSearch(e)}
        >
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث"
            className="w-full p-4 "
          ></input>
          <button type="submit" className="justify-start">
            <MagnifyingGlassIcon className="w-6 h-6 mx-5 hover:bg-primary/10 active:bg-primary/20"></MagnifyingGlassIcon>
          </button>
        </form>
        <table {...getTableProps()} className="w-full">
          <thead className="bg-secondary h-8">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="h-12 border-2 rounded">
                  {row.cells.map((cell) => {
                    return (
                      <td className="text-center " {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { billType } = context.query;
  const filter = (billType || "public") as string;
  const page = 1;
  const limit = 9999999999;
  const { data } = await axios({
    url: `http://localhost:3000/home/allprojectbill?page=${page}&limit=${limit}&filter=${filter}`,
  });
  return {
    props: {
      billsType: filter,
      homeBills: data.map((row) => {
        return {
          ...row,
          inReturn: row?.inReturn || "",
          totalCost: row?.totalCost || "",
          totalWorkers: row?._count?.workers || 0,
          projectStatus: row?.projectStatus ? "مدفوع" : "معلق",
        };
      }),
    }, // will be passed to the page component as props
  };
};
export default Home;
