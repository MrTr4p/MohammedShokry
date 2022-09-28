import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import LogoPng from "../public/images/logo.png";
import axios from "axios";
import { useRouter } from "next/router";
import * as jwtDecode from "jwt-decode";

function Signin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSignIn() {
    const { data } = await axios({
      url: "http://127.0.0.1:3000/home/login",
      method: "POST",
      data: {
        password: password,
      },
    });

    if (data === "الرمز غير صحيح") return setError("الرمز السرى غير صحيح");

    const token: { data: { accountType: "EDIT" | "CREATE" } } =
      jwtDecode.default(data);

    if (
      token.data.accountType == "EDIT" ||
      token.data.accountType == "CREATE"
    ) {
      localStorage.setItem("accessToken", data);
      localStorage.setItem("accountType", token.data.accountType);
      return router.push("/");
    }
  }

  return (
    <>
      <div>
        <Head>
          <title>Sign up</title>
        </Head>
      </div>
      <main className="absolute inset-0 grid place-content-center">
        <div className="bg-base shadow-xl max-w-lg p-4 outline outline-1 rounded-md mx-auto aspect-square w-full h-full space-y-4 z-30">
          <div className="flex justify-center">
            <Image src={LogoPng}></Image>
          </div>
          <div className=" flex flex-col items-center justify-center text-2xl space-y-2">
            <h1>S.H COMPANY</h1>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
          <div className="flex justify-center">
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-52 border-2 transition duration-500 placeholder-primary focus:placeholder-transparent border-priamry  py-2 text-center text-primary bg-transparent rounded-md focus:outline-none"
            ></input>
          </div>
          <div className="flex justify-center">
            <button
              disabled={password.length < 3}
              onClick={handleSignIn}
              className=" inline-block px-6 py-2.5 disabled:bg-primary/50 bg-primary text-white font-medium  leading-tight uppercase rounded-md shadow-md hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary/80 active:shadow-lg transition duration-150 ease-in-out"
            >
              Enter
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Signin;
