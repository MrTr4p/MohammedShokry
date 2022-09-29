import React, { useEffect, useState } from "react";
import { Input, Worker } from "../typings/interfaces";

function CreateWorkerInput(props: {
	children?: any;
	onChange?: (e: any) => void;
	type?: React.HTMLInputTypeAttribute;
	placeholder?: string;
	value?: string;
	name?: string;
}) {
	return (
		<input
			{...props}
			className="border border-dashed p-2 bg-base border-black focus:outline-primary rounded-md w-full print:border-0 h-10 px-2"
		/>
		<button>
						<PencilSquareIcon className="w-7 h-7 mt-1 mr-10"></PencilSquareIcon>
					</button>
					<button>
						<PrinterIcon className="w-7 h-7 mt-1 mr-10"></PrinterIcon>
					</button>
	);
}

export default CreateWorkerInput;
