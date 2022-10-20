import React, { useState } from "react";

function ChooseWorkerInput({
	label,
	type,
	placeholder,
	value,
	iprops,
	iref,
	required,
	error,
	iclassName,
	lclassName,
	disabled,
}: {
	required?: boolean;
	disabled?: boolean;

	iref?: any;
	label?: string;
	placeholder?: string;
	type: React.HTMLInputTypeAttribute;
	value?: any;
	error?: string;
	iclassName?: string;
	lclassName?: string;
	iprops?: {};
}) {
	return (
		<div className="space-y-2 flex-grow">
			<div className="flex flex-col">
				{label && (
					<label
						className={`font-semibold text-lg text-black ${lclassName}`}
					>
						{label}
					</label>
				)}
				{error && (
					<label
						className={`font-semibold text-sm text-red-600 ${lclassName}`}
					>
						{error}
					</label>
				)}
			</div>

			<input
				{...iprops}
				ref={iref}
				required={required}
				value={value}
				type={type}
				placeholder={placeholder}
				disabled={disabled}
				className={`border-gray-400 print:border-solid text-right border-2 border-dashed w-full h-9 focus:outline-none ${
					error ? "border-red-600 focus:border-red-600" : ""
				} focus:border-primary focus:border-solid py-1 px-2 rounded-md transition ${iclassName}`}
			/>
		</div>
	);
}

export default ChooseWorkerInput;
