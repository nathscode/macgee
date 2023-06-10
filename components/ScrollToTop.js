import { useEffect, useState } from "react";

export const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);

		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	return (
		<div className="fixed bottom-2 right-2">
			<button
				type="button"
				onClick={scrollToTop}
				className={`
				bg-brand hover:bg-brand/70 focus:ring-brand inline-flex items-center rounded-full p-3 text-white shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 ${
					isVisible ? "opacity-100" : "opacity-0"
				}
				`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					strokeWidth="2.5"
					stroke="currentColor"
					className="h-4 w-4"
				>
					<path
						fillRule="evenodd"
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		</div>
	);
};
