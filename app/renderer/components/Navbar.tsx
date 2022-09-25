import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import LogoPng from "../public/images/logo.png";

function Navbar() {


	return (
		<nav className="h-16 relative">
			<div className="shadow-md fixed w-screen flex items-center bg-base h-16 ">
				<div className="container w-full flex justify-between items-center">
					<div className="relative h-8 w-8 ">
						<Image src={LogoPng} layout="fill"></Image>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
