import React from "react";
import Image from "next/image";
import LogoPng from "../public/images/logo.png";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";

function Navbar() {
	return (
		<nav className="h-16 relative">
			<div className="shadow-md fixed w-screen flex items-center bg-base h-16 z-50">
				<div className="container w-full flex justify-between items-center">
					<Link href="/">
						<a className="relative rounded-md p-1 h-8 w-8">
							<Image src={LogoPng} layout="fill"></Image>
						</a>
					</Link>
					<div className="ml-2 font-bold flex gap-4">
						<Link href="/signin">
							<a>Sign In</a>
						</Link>
						<Link href="/create-another-bill">
							<a>Create AB</a>
						</Link>
						<Link href="/create">
							<a>Create</a>
						</Link>
						<Link href="/">
							<a>Home</a>
						</Link>
						<Link href="/previewbill">
							<a>preview</a>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
