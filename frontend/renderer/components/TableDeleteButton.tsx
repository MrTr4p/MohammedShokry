import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

function TableDeleteButton({ onClick }) {
	return (
		<button
			className="p-1.5 bg-red-500 hover:bg-red-600 active:bg-red-400 transition rounded-md flex justify-center"
			onClick={onClick}
		>
			<TrashIcon className=" text-white h-6 w-6"></TrashIcon>
		</button>
	);
}

export default TableDeleteButton;
