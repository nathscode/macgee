import { MediaExtras, SafeMedias } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ProductCarouselProps {
	medias: MediaExtras[];
}

const ProductCarousel = ({ medias }: ProductCarouselProps) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	function handleChange(index: number) {
		setCurrentIndex(index);
	}

	const renderSlides = medias.map((media, index) => (
		<div key={index} className="w-full">
			<div
				className="h-[400px] md:h-[600px] bg-cover bg-center"
				style={{ backgroundImage: `url(${media?.url})` }}
			></div>
		</div>
	));
	const renderThumbs = () => {
		const thumbElements = medias.map((media, index) => (
			<div
				key={index}
				onClick={() => handleChange(index)}
				className={`${
					index === currentIndex ? "border border-brand" : ""
				} mx-auto`}
			>
				<Image
					src={media?.url!}
					alt={"thumbnail"}
					width={100}
					height={100}
					className="object-cover"
				/>
			</div>
		));

		return thumbElements;
	};

	const renderArrowPrev = (onClickHandler: () => void, hasPrev: boolean) => (
		<button
			onClick={onClickHandler}
			disabled={!hasPrev}
			className={`prev-arrow absolute top-[50%] left-2 z-10 bg-slate-100 hover:bg-slate-50 transition-all h-10 w-10 rounded-full inline-flex items-center justify-center  ${
				hasPrev ? "text-brand" : "text-gray-300 pointer-events-none"
			}`}
		>
			<ArrowLeft className="w-6 h-6" />
		</button>
	);

	const renderArrowNext = (onClickHandler: () => void, hasNext: boolean) => (
		<button
			onClick={onClickHandler}
			disabled={!hasNext}
			className={`next-arrow absolute top-[50%] right-2 z-10 bg-slate-100 hover:bg-slate-50 transition-all h-10 w-10 rounded-full inline-flex items-center justify-center ${
				hasNext ? "text-brand" : "text-gray-300 pointer-events-none"
			}`}
		>
			<ArrowRight className="w-6 h-6" />
		</button>
	);

	const renderIndicator = (
		clickHandler: (
			e: React.MouseEvent<HTMLButtonElement>,
			index: number
		) => void,
		isSelected: boolean,
		index: number
	) => (
		<button
			onClick={(e) => clickHandler(e, index)}
			className={`indicator ${
				isSelected ? "bg-brand w-3 h-3" : "bg-white"
			} rounded-full w-2 h-2 mx-2 my-4`}
		/>
	);

	return (
		<div className="relative my-5 w-full bg-white sm:mx-auto">
			<Carousel
				showArrows={true}
				autoPlay={true}
				infiniteLoop={true}
				selectedItem={currentIndex}
				onChange={handleChange}
				renderThumbs={renderThumbs}
				renderArrowPrev={renderArrowPrev}
				renderArrowNext={renderArrowNext}
				renderIndicator={renderIndicator}
			>
				{renderSlides}
			</Carousel>
		</div>
	);
};

export default ProductCarousel;
