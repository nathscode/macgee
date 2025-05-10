import { HiExclamationCircle } from "react-icons/hi2";

type ErrorProps = {
	message?: string;
};

export function Error({ message }: ErrorProps): JSX.Element {
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="flex flex-col items-center justify-center">
				<h1 className="font-bold text-brand text-9xl">404</h1>

				<h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
					<span className="text-red-500">Oops!</span>
				</h6>

				<p className="mb-8 text-center text-gray-500 md:text-lg">
					{message ?? "Something went wrong. Try Loading."}
				</p>

				<a
					href="/inventory"
					className="px-6 py-2 text-sm font-semibold text-white bg-brand"
				>
					Go home
				</a>
			</div>
		</div>
	);
}
