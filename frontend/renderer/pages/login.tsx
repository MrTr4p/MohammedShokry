import Image from "next/image";
import React from "react";
import Input from "../components/Input";
import Logo from "../public/images/logo.png";

function Login() {
	return (
		<div className="absolute inset-x-0 w-full top-14 bottom-0 grid place-items-center">
			<div className="max-w-sm rounded-md border-2 py-16 w-full flex flex-col items-center p-4">
				<div className="w-36 h-36 rounded">
					<Image src={Logo}></Image>
				</div>
				<h1 className="font-semibold text-xl">
					S.H Steel Construction
				</h1>

				<Input
					type={"text"}
					lclassName="text-center"
					iclassName="placeholder:text-center"
					placeholder={"Password"}
				></Input>
			</div>
		</div>
	);
}

export default Login;
