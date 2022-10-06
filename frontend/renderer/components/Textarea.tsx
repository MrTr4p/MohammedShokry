import React, { useState } from "react";

function TextArea({
	label,
	placeholder,
	value,
	onChange,
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
	value?: any;
	error?: string;
	iclassName?: string;
	lclassName?: string;
	onChange?: (e: any) => any;
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

			<textarea
				disabled={disabled}
				ref={iref}
				required={required}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				className={`border-gray-400 border-2 border-dashed w-full h-40 focus:outline-none ${
					error ? "border-red-600 focus:border-red-600" : ""
				} focus:border-primary focus:border-solid py-1 px-2 rounded-md transition ${iclassName}`}
			/>
		</div>
	);
}

export default TextArea;
