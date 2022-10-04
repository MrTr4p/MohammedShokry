import React from "react";

function Input({
	label,
	type,
	placeholder,
	onChange,
}: {
	label?: string;
	placeholder?: string;
	type: React.HTMLInputTypeAttribute;
	onChange: (e: any) => any;
}) {
	return (
		<div className="space-y-2 flex-grow">
			{label && (
				<label className="font-semibold text-lg text-black">
					{label}
				</label>
			)}
			<input
				type={type}
				placeholder={placeholder}
				onChange={onChange}
				className="border-gray-400 border-2 border-dashed w-full h-9 focus:outline-none focus:border-primary focus:border-solid py-1 px-2 rounded-md transition"
			/>
		</div>
	);
}

export default Input;
