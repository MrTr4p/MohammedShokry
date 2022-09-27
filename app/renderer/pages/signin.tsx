import React from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import LogoPng from "../public/images/logo.png";

function Signin() {
	return (
		<>
			<div>
				<Head>
					<title>Sign up</title>
				</Head>
			</div>
			<main className="absolute inset-0 grid place-content-center pointer-events-none">
				<div className="bg-base shadow-xl max-w-lg p-4 outline outline-1 rounded-md mx-auto aspect-square w-full h-full space-y-4">
					<div className="flex justify-center">
						<Image src={LogoPng}></Image>
					</div>
					<div className=" flex justify-center text-2xl">
						<h1>S.H COMPANY</h1>
					</div>
					<div className=" flex justify-center">
						<input
							placeholder="Password"
							className="border-2 transition duration-500 placeholder-primary focus:placeholder-transparent border-priamry w-4/12 py-2 text-center text-primary bg-transparent rounded-md focus:outline-none"
						></input>
					</div>
					<div className="flex justify-center">
						<button
							disabled
							className="inline-block px-6 py-2.5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary/80 active:shadow-lg transition duration-150 ease-in-out"
						>
							Enter
						</button>
					</div>
				</div>
			</main>
		</>
	);
}

export default Signin;
