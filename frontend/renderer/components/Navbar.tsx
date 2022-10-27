import React from "react";
import Image from "next/image";
import LogoPng from "../public/images/logo.png";
import Link from "next/link";

function Navbar() {
	return (
        <nav className="h-14 relative print:hidden">
			<div className="shadow-md fixed w-screen flex items-center bg-base h-14 z-50">
				<div className="container w-full flex justify-between items-center">
					<div className="flex items-center gap-2">
						<Link href="/" className="relative rounded-md p-1 h-8 w-8">

                            <Image src={LogoPng} layout="fill"></Image>

                        </Link>
						<h1 className="font-semibold">
							شركة أس.أتش للبناء والصلب
						</h1>
					</div>
				</div>
			</div>
		</nav>
    );
}

export default Navbar;
