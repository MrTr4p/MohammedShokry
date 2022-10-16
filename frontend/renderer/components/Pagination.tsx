import React  from 'react'
import ReactPaginate from 'react-paginate';
import {
    ArrowUturnRightIcon,
	ArrowUturnLeftIcon,
}
from '@heroicons/react/24/outline'
type Props = {}
import { AnotherPaymentsBill, ProjectBill, useStore } from "../store";
import axios from "axios";

function Pagination ({data} : {data: any[];}) {
    function handlePageClick (){
            console.log('//')
    }
    function idk (){
        console.log(data)
    }
  return (
    <div>
        <ReactPaginate
			previousLabel={<div><ArrowUturnRightIcon className="w-8 h-4 my-2"></ArrowUturnRightIcon></div>}
			pageCount={10}
			onPageChange={idk}
			nextLabel={<div><ArrowUturnLeftIcon className="w-8 h-4 my-2"></ArrowUturnLeftIcon></div>}
			marginPagesDisplayed={1}
			containerClassName={" my-3 flex items-center space-x-3 mx-auto"}
			pageClassName={" rounded-2xl text-gray-700 bg-gray-200 rounded-md hover:bg-blue-100 hover:text-white "}
			pageLinkClassName={" relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500  focus:shadow-none"}
			previousClassName={"mx-3  font-bold text-black-500 bg-gray-300 rounded-xl hover:bg-blue-400 hover:text-white"}
			previousLinkClassName={"page-link"}
			nextClassName={"font-bold text-black-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white"}
			activeClassName={"bg-blue border-red-300 text-red-500 hover:bg-blue-100 relative inline-flex items-center border text-sm font-medium"}
			></ReactPaginate>
    </div>
  )
}

export default Pagination

