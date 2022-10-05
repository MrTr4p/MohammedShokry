import Image from "next/image";
import React from "react";
import Input from "../components/Input";
import Logo from "../public/images/logo.png";

function Login() {
	return (
		<div className="absolute inset-x-0 w-full top-14 bottom-0 grid place-items-center">
			<div className="drop-shadow-lg bg-base max-w-xs rounded-md border-2 gap-4 pb-16 w-full flex flex-col items-center p-4">
				<div className="flex flex-col items-center mb-4 ">
					<div className="w-36 h-36 ">
						<Image src={Logo} className=""></Image>
					</div>
					<h1 className="font-semibold text-xl mt-2">
						S.H Steel Construction
					</h1>
				</div>

				<Input
					type={"text"}
					lclassName="text-center"
					iclassName="placeholder:text-center text-center h-12"
					placeholder={"Password"}
				></Input>

				<button className="btn-primary py-1">Login</button>
			</div>
		</div>
	);
}

export default Login;
