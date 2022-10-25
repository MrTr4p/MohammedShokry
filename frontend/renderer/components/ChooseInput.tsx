import React, { useState } from "react";

function ChooseInput({
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
				className={`border-gray-400 border-solid text-center border-2 border-solid w-full h-9 focus:outline-none ${
					error ? "border-red-600 border-solid focus:border-red-600" : ""
				} focus:border-primary border-solid py-1 px-full rounded-md transition ${iclassName}`}
			/>
		</div>
	);
}

export default ChooseInput;
