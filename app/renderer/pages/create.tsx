import React from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { XMarkIcon } from "@heroicons/react/24/solid";

function Home() {
	const names = [ 
		{
			title :'اسم العامل',
			placeholder:'محمد اسامة خلف'

		},
		{
			title: 'اسم المشروع ',
			placeholder:'متجر عربيات'

		},
		{
			title:'عنوان العميل' ,
			placeholder:'الحي التاني المجاورة الثالثة'

		},
		{
			title:'التاريخ',
			placeholder:'20/2/2006  '
		}
		  ]
	const Header = tw.h1`text-5xl font-bold text-black`;
	const SubHeader = tw.h1`text-xl text-black`;

	return (
		<>
			<Head>
				<title>Create New</title>
			</Head>
			<main>
				<div className="flex justify-between items-start">
					<div className="flex flex-col items-start gap-2">
						<Header>أضافة فاتورة جديدة</Header>
						<SubHeader>
							كلام
							كتيييييييييييييييييييييييييييييييييييييييييييييييييييير
							كتيييييييييييييييييييييييييييييييييييييييييييييييييييير
						</SubHeader>
					</div>

					<button className="bg-white drop-shadow-lg text-primary border-black border-2 text-2xl font-semibold flex items-center gap-2 px-4 py-2 rounded-md hover:bg-white/80 active:bg-white ">
						<span>الغاء</span>
						<XMarkIcon className="h-8 w-8"></XMarkIcon>
					</button>
				</div>
				<div className=" mt-16 border-primary border ">

				<div className="flex row mt-3 mx-16 ">
				{names.map (name => (
					<div>
							<div className=" mr-16 text-xl font-semibold">
							{name.title}
						</div>
						<input className=" p-2 mt-1 mb-3 rounded mx-16 border border-primary" placeholder={name.placeholder}></input>
					</div>
					))}
				</div>
				<div className=" ">
				<div className=" flex row mx-16 mt-3 ">
				{names.map (name => (
					<div>
							<div className="mx-16 text-xl font-semibold">
							{name.title}
						</div>
						<input className=" p-2 mt-1 mb-3 rounded mx-16 border border-primary" placeholder={name.placeholder}></input>
					</div>
					))}
				</div>
				</div>
				</div>
			</main>
		</>
	);
}

export default Home;
