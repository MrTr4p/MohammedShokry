import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useStore } from "../store";
import "../styles/globals.css";
import "../styles/rw.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
	const user = useStore((state) => state.user);
	const router = useRouter();

	useEffect(() => {
		if (!user.loggedIn) {
			if (router.pathname !== "/login") router.push("/login");
		} else if (user.accountType === "create") {
			if (router.pathname.includes("/edit")) router.push("/");
		}
	}, [user, router]);
	//	const user = useStore((state) => state.user);

	return (
		<>
			{user.loggedIn && <Navbar></Navbar>}
			<div className="container print:max-w-full mt-12">
				<Component {...pageProps} />
			</div>
		</>
	);
}
