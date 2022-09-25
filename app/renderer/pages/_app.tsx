import React from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Navbar></Navbar>
			<div className = "container mt-12">
				<Component {...pageProps} />
			</div>
		</>
	);
}

export default MyApp;
