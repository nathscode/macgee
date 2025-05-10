"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Login() {
	const router = useRouter();

	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [formError, setFormError] = useState("");

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (formError) setFormError("");
		if (!form.email.includes("@")) {
			return setFormError("Please enter a valid email");
		}

		const res = await signIn("credentials", {
			redirect: false,
			email: form.email,
			password: form.password,
		});

		if (res && res.ok && !res.error) {
			router.push("/dashboard");
		} else {
			alert(res?.error || "An error occured");
		}
	};

	const onChange = ({
		target: { name, value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
			<div className="-space-y-px">
				<div className="w-full mb-4">
					<label
						className="block mb-2 text-sm font-bold text-gray-700"
						htmlFor="email"
					>
						Email
					</label>
					<input
						className="rounded-md appearance-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand/50 focus:border-brand/50 focus:z-10 !text-xs"
						id="email"
						name="email"
						type="email"
						placeholder="Email"
						onChange={onChange}
					/>
				</div>
				<div className="w-full mb-4">
					<label
						className="block mb-2 text-sm font-bold text-gray-700"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="rounded-md appearance-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand/50 focus:border-brand/50 focus:z-10 !text-xs"
						id="password"
						type="password"
						name="password"
						placeholder="Password"
						onChange={onChange}
					/>
				</div>
			</div>

			<div className="w-full mt-5 text-center">
				{/* @ts-ignore */}
				<Button
					type={"submit"}
					size={"default"}
					className={"rounded-md text-sm w-full px-10"}
				>
					Login
				</Button>
			</div>
		</form>
	);
}
