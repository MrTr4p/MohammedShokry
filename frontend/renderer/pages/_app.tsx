import { AppProps } from "next/app";
import Navbar from "../components/Navbar";

import "../styles/globals.css";
export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Navbar></Navbar>
			<div className="container mt-12">
				<Component {...pageProps} />
			</div>
		</>
	);
}
