import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Input from "../../../../components/Input";
import Logo from "../public/images/logo.png";
import { useStore } from "../../../../store";

function expenses() {
	const login = useStore((state) => state.login);
	const user = useStore((state) => state.user);

	useEffect(() => {
		if (user.loggedIn) router.push("/");
	}, [user]);

	const passwordRef = useRef();
	const router = useRouter();
	const [info, setInfo] = useState({ message: "", error: false });

	async function handleLogin(e) {
		e.preventDefault();
		const password = (passwordRef as any).current.value;
		const result = await login(password);

		setInfo(result);

		if (!result.error) router.push("/");
	}

	return (
		<div className="absolute inset-x-0 w-full top-14 bottom-0 grid place-items-center">
			<div className="drop-shadow-lg bg-base max-w-xs rounded-md border-2 gap-4 pb-16 w-full flex flex-col items-center p-4">
				<div className="flex flex-col items-center mb-4 ">
					<div className="w-36 h-36 ">
						<Image src={Logo} className=""></Image>
					</div>
					<h1 className="font-semibold text-xl mt-2">
						S.H Steel Construction
					</h1>
				</div>

				<form
					className="flex flex-col items-center gap-4"
					onSubmit={(e) => handleLogin(e)}
				>
					<Input
						error={info.error && info.message}
						label={!info.error && info.message}
						lclassName={`text-center ${
							!info.error && "text-green-500"
						}`}
						iref={passwordRef}
						type={"password"}
						iclassName="placeholder:text-center text-center h-12"
						placeholder={"Password"}
					></Input>

					<button className="btn-primary py-1" type="submit">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default expenses;
