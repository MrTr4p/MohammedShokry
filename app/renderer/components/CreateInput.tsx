import React, { useEffect, useState } from "react";
import { Input, Worker } from "../typings/interfaces";
import { v4 as uuidv4 } from "uuid";

function CreateWorkerInput({
	children,
	onChange,
	type,
	placeholder,
	value,
	name,
}: {
	children?: any;
	onChange?: (e: any) => void;
	type?: React.HTMLInputTypeAttribute;
	placeholder?: string;
	value?: string;
	name?: string;
}) {
	return (
		<div className="flex flex-col items-start space-y-2 grow">
			<label className="text-lg font-semibold">{children}</label>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				name={name}
				onChange={onChange}
				className="border border-dashed p-2 bg-base border-black focus:outline-primary rounded-md w-full print:border-0"
			/>
		</div>
	);
}

export default CreateWorkerInput;
