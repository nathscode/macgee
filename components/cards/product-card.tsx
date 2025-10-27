"use client";
import { ProductWithOutUser } from "@/types";
import { fadeMoveInTop } from "@/utils/animations";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import QuoteModal from "../modals/QuoteModal";
import { useCallback, useState } from "react";

type Props = {
	inventory: ProductWithOutUser;
};

const ProductCard = ({ inventory }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	const handleClick = useCallback((e: React.MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target.closest("[data-stop-propagation]")) return;
		e.preventDefault();
		setIsOpen(true);
	}, []);
	const srcImage =
		inventory.medias?.length > 0
			? inventory.medias[0].url
			: "/placeholder-image.png";
	const productDetails = `${inventory.title} (${inventory.year}) - ${inventory.category}`;
	return (
		<>
			<motion.li
				variants={fadeMoveInTop}
				initial="initial"
				animate="animate"
				// exit='exit'
				key={inventory.id}
				className="relative focus:outline-none mx-2 h-full w-full sm:w-[350px] mb-8 group"
			>
				<Link
					href={`/inventory/${inventory.slug}`}
					className="inline-flex flex-col w-full overflow-hidden"
				>
					<span className="absolute z-[2] inline-flex items-center justify-center px-3 font-Poppins py-2 text-xs font-semibold text-white bg-black border-0 rounded-md right-4 top-4">
						{inventory.condition}
					</span>
					<div className="relative flex items-center justify-center w-full sm:w-[350px] h-[220px] transition ">
						<Image
							src={srcImage!}
							alt={inventory.title}
							layout="fill"
							className="w-full h-full focus:outline-none object-cover"
						/>
					</div>
				</Link>
				<div className="bg-white">
					<div className="flex flex-col items-start justify-start">
						<Link
							href={`/inventory/${inventory.slug}`}
							className="m-0 mt-2 text-lg font-bold text-black group-hover:text-brand"
						>
							{inventory.title}
						</Link>
						<div className="flex justify-between w-full my-2">
							<div className="inline-flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
									className="w-6 h-6 mr-2 fill-[#8e9191]"
								>
									<path d="M136.458 304.198a10.158 10.158 0 0 0-7.131 2.955 10.178 10.178 0 0 0-2.955 7.131 10.14 10.14 0 0 0 2.955 7.13 10.12 10.12 0 0 0 7.131 2.956 10.12 10.12 0 0 0 7.131-2.956 10.142 10.142 0 0 0 2.955-7.13c0-2.654-1.079-5.245-2.955-7.131a10.161 10.161 0 0 0-7.131-2.955zm-17.954 56.535h-1.009c-5.571 0-10.086 4.517-10.086 10.087s4.516 10.087 10.086 10.087h1.009c5.571 0 10.087-4.517 10.087-10.087s-4.517-10.087-10.087-10.087zm157.469-9.582c2.663 0 5.255-1.079 7.141-2.956 1.876-1.875 2.955-4.477 2.955-7.13s-1.079-5.255-2.955-7.131a10.18 10.18 0 0 0-7.141-2.955 10.175 10.175 0 0 0-7.131 2.955c-1.876 1.876-2.945 4.478-2.945 7.131s1.069 5.255 2.945 7.13a10.187 10.187 0 0 0 7.131 2.956z" />
									<path d="m511.001 413.851-39.337-81.701a10.086 10.086 0 0 0-9.088-5.711h-.168c-24.046 0-42.879 16.976-47.043 40.85H394.32v-19.346c0-27.827-13.462-54.167-36.012-70.458l-38.853-28.079L270.02 90.772a10.085 10.085 0 0 0-9.63-7.085H112.452c-5.571 0-10.087 4.517-10.087 10.086v132.14l-51.206 37.004a10.09 10.09 0 0 0-1.225 15.308l27.264 27.264s-62.254 44.437-62.47 44.621C1.07 361.717-3.587 380.997 2.863 399.224c6.182 17.471 20.596 28.599 37.637 29.071.2.011.399.017.599.017h311.633c17.607 0 32.907-10.678 38.98-27.203.722-1.966 2.606-13.647 2.606-13.647h21.046c4.164 23.875 22.996 40.85 47.043 40.85h39.506a10.086 10.086 0 0 0 9.088-14.461zm-245.929-271.16v.001l27.112 87.004-40.287-29.115c-16.216-12.889-36.532-19.984-57.24-19.984-9.645 0-19.257 1.548-28.414 4.52v-42.426h98.829zm-142.534-38.832H252.97l5.816 18.66H122.538v-18.66zm0 38.834h23.532v51.792c-.512.318-23.532 16.851-23.532 16.851v-68.643zM72.571 272.334s84.433-61.054 88.33-63.125a72.02 72.02 0 0 1 33.756-8.437c16.23 0 32.155 5.585 44.841 15.725.127.103.258.201.39.298l106.605 77.042c17.315 12.511 27.654 32.739 27.654 54.109v3.208L221.23 240.643c-15.456-12.873-37.656-12.88-53.12-.022l-74.264 52.99-21.275-21.277zm149.824 2.573c0 15.295-12.443 27.738-27.738 27.738s-27.738-12.443-27.738-27.738c0-3.468.631-6.813 1.858-9.984 0 0 11.829-8.451 12.046-8.636a21.288 21.288 0 0 1 27.667 0c.201.17 12.105 8.788 12.105 8.788a27.482 27.482 0 0 1 1.8 9.832zM41.218 408.136l-.117-.003c-10.183-.263-16.604-8.247-19.22-15.636-2.728-7.711-2.865-19.289 5.618-26.76l17.812-12.712c13.305 2.109 23.315 13.566 23.315 27.378 0 15.138-12.284 27.551-27.408 27.733zm113.093-27.23h146.214a47.645 47.645 0 0 0 8.856 27.234H79.898c5.599-7.841 8.899-17.424 8.899-27.738a48.018 48.018 0 0 0-3.104-16.986l31.522-22.779c4.516-3.263 5.53-9.568 2.267-14.084-3.262-4.514-9.569-5.529-14.083-2.267L74.741 346.44a47.789 47.789 0 0 0-9.725-7.476l82.042-58.543c2.742 23.831 23.042 42.398 47.596 42.398 10.476 0 20.171-3.387 28.065-9.113l21.984 15.886a10.045 10.045 0 0 0 5.9 1.912c3.128 0 6.211-1.45 8.184-4.18 3.262-4.516 2.247-10.821-2.268-14.084l-20.248-14.632a47.56 47.56 0 0 0 5.946-17.911l81.365 58.799c-8.197 5.029-14.754 12.465-18.756 21.236H154.311c-5.571 0-10.086 4.517-10.086 10.087s4.515 10.087 10.086 10.087zm218.468 13.246c-2.485 6.762-9.057 13.988-20.046 13.988h-4.307c-15.295 0-27.738-12.444-27.738-27.738 0-13.14 9.402-24.441 21.958-27.126l24.195 17.488c8.1 7.09 8.394 16.704 5.938 23.388zm89.629 13.988c-16.073 0-27.738-12.938-27.738-30.764 0-15.569 8.899-27.409 21.859-30.158l29.333 60.922h-23.454z" />
								</svg>
								<span>{inventory.manufacturer}</span>
							</div>
							<div>
								<button
									onClick={handleClick}
									style={{ cursor: "pointer" }}
									className="px-2.5 py-1.5 bg-brand text-white uppercase text-sm rounded-md hover:opacity-75"
								>
									Get Quote
								</button>
							</div>
						</div>
						<ul className="flex items-start justify-around w-full p-0 mt-2">
							<li
								className="flex items-center justify-start w-full inventory__meta__item"
								title="Engine"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="w-6 h-6 fill-[#8e9191] mr-2"
								>
									<path fill="none" d="M0 0H24V24H0z" />
									<path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm3.833 3.337c.237-.166.559-.138.763.067.204.204.23.526.063.76-2.18 3.046-3.38 4.678-3.598 4.897-.586.585-1.536.585-2.122 0-.585-.586-.585-1.536 0-2.122.374-.373 2.005-1.574 4.894-3.602zM17.5 11c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-11 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm2.318-3.596c.39.39.39 1.023 0 1.414-.39.39-1.024.39-1.414 0-.39-.39-.39-1.024 0-1.414.39-.39 1.023-.39 1.414 0zM12 5.5c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" />
								</svg>
								<span className="text-xs font-semibold">{inventory.model}</span>
							</li>

							<li
								className="flex items-center justify-center w-full inventory__meta__item"
								title="time power"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="w-6 h-6 fill-[#8e9191] mr-2"
								>
									<path fill="none" d="M0 0h24v24H0z" />
									<path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z" />
								</svg>
								<span className="text-xs font-semibold">10,100</span>
							</li>
							<li
								className="flex items-center justify-end w-full inventory__meta__item"
								title="manufactured date"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="w-6 h-6 fill-[#8e9191] mr-2"
								>
									<path fill="none" d="M0 0h24v24H0z" />
									<path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z" />
								</svg>
								<span className="text-xs font-semibold">{inventory.year}</span>
							</li>
						</ul>
					</div>
				</div>
			</motion.li>

			<QuoteModal
				isOpen={isOpen}
				handleClose={handleClose}
				product={productDetails}
				productId={inventory.id}
			/>
		</>
	);
};

export default ProductCard;
