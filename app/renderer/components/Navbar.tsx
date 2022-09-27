import React from "react";
import Image from "next/image";
import LogoPng from "../public/images/logo.png";
import Link from "next/link";

function Navbar() {
	return (
		<nav className="h-16 relative">
			<div className="shadow-md fixed w-screen flex items-center bg-base h-16 z-50">
				<div className="container w-full flex justify-between items-center">
					<div className="relative h-8 w-8 ">
						<Image src={LogoPng} layout="fill"></Image>
					</div>
					<div className="ml-2 font-bold flex gap-2">
						<Link href="/">
							<a>Home</a>
						</Link>
						<Link href="/create">
							<a>Create</a>
						</Link>
						<Link href="/signin">
							<a>Sign In</a>
						</Link>
						<Link href="/anotherbill">
							<a>anotherbill</a>
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
