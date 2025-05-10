import LoginForm from "@/components/forms/login-form";
import { Suspense } from "react";

const LoginPage = async () => {
	return (
		<div className="bg-blue-50 h-screen flex justify-center items-center flex-col w-full py-24">
			<div className="flex flex-col items-center justify-center w-full max-w-sm ">
				<Suspense>
					<LoginForm />
				</Suspense>
			</div>
		</div>
	);
};

export default LoginPage;
