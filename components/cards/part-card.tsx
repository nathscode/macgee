"use client";
import { ProductWithOutUser } from "@/types";
import { fadeMoveInTop } from "@/utils/animations";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import QuoteModal from "../modals/QuoteModal";

type Props = {
	inventory: ProductWithOutUser;
};
const FALLBACK_IMAGE = "/placeholder-image.png";

const PartCard = ({ inventory }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const initialSrc = inventory.medias?.[0]?.url || FALLBACK_IMAGE;

	const [imgSrc, setImgSrc] = useState<string>(initialSrc);

	useEffect(() => {
		setImgSrc(inventory.medias?.[0]?.url || FALLBACK_IMAGE);
	}, [inventory]);

	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	const handleClick = useCallback((e: React.MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target.closest("[data-stop-propagation]")) return;
		e.preventDefault();
		setIsOpen(true);
	}, []);

	const productDetails = `${inventory.title} - ${inventory.manufacturer}`;
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
							src={imgSrc}
							alt={inventory.title || "Inventory image"}
							sizes="80px"
							onError={() => {
								setImgSrc(FALLBACK_IMAGE);
							}}
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
								<span>Brand</span>
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

export default PartCard;
