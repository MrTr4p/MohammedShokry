import React from "react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import LogoPng from "../public/images/logo.png";

function Navbar() {
	return (
		<nav className="h-14 relative">
			<div className="shadow-md fixed w-screen flex items-center bg-base h-14">
				<div className="container w-full flex justify-between items-center">
					<div className="relative h-8 w-8 ">
						<Image
							src={LogoPng}
							layout="fill"
							className="rounded-full"
						></Image>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
