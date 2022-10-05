import React, { useState } from "react";

function Input({
	label,
	type,
	placeholder,
	value,
	onChange,
	iref,
	required,
	error,
}: {
	required?: boolean;
	iref?: any;
	label?: string;
	placeholder?: string;
	type: React.HTMLInputTypeAttribute;
	value?: any;
	error?: string;
	onChange?: (e: any) => any;
}) {
	return (
		<div className="space-y-2 flex-grow">
			<div className="flex flex-col">
				{label && (
					<label className="font-semibold text-lg text-black">
						{label}
					</label>
				)}
				{error && (
					<label className="font-semibold text-sm text-red-600">
						{error}
					</label>
				)}
			</div>

			<input
				ref={iref}
				required={required}
				value={value}
				type={type}
				placeholder={placeholder}
				onChange={(e) => onChange(e)}
				className={`border-gray-400 border-2 border-dashed w-full h-9 focus:outline-none ${
					error ? "border-red-600 focus:border-red-600" : ""
				} focus:border-primary focus:border-solid py-1 px-2 rounded-md transition`}
			/>
		</div>
	);
}

export default Input;
