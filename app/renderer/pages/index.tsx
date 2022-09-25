import React from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";

function Home() {
	const Header = tw.h1`text-5xl font-bold text-black`;

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<main>
				<div className = "">

				</div>
				<Header>الفواتير</Header>
			</main>
		</>
	);
}

export default Home;
