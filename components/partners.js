import Image from "next/image";
import React from "react";

const Partners = () => {
	return (
		<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
			<div className="flex flex-col justify-center items-center lg:flex-row">
				<div className="mb-6 lg:mb-0 lg:w-2/5 lg:pr-5">
					<h5 className="mb-6 text-4xl font-extrabold leading-none">
						Our Global Partners
					</h5>
					<p className="mb-6 text-[#8e9191] font-normal text-base leading-[20px] ">
						At Macgee, our primary focus lies in delivering exceptional quality
						and unmatched durability. With a view to fulfilling your exacting
						demands, we have partnered with renowned brands.
					</p>
				</div>
				<div className="lg:w-3/5">
					<div className="flex justify-start items-center flex-wrap my-5">
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"100px"}
								className="object-contain"
								src="/assets/images/partners/caterpillar.svg"
							/>
						</div>
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"100px"}
								className="object-contain"
								src="/assets/images/partners/toshiba.svg"
							/>
						</div>
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"100px"}
								className="object-contain"
								src="/assets/images/partners/volvo.svg"
							/>
						</div>
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"100px"}
								className="object-contain"
								src="/assets/images/partners/siemens.svg"
							/>
						</div>
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"100px"}
								className="object-contain"
								src="/assets/images/partners/detroit.svg"
							/>
						</div>
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"100px"}
								className="object-contain"
								src="/assets/images/partners/schneider.svg"
							/>
						</div>
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"100px"}
								className="object-contain"
								src="/assets/images/partners/mitsubishi.svg"
							/>
						</div>
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"100px"}
								className="object-contain"
								src="/assets/images/partners/general.svg"
							/>
						</div>
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"100px"}
								className="object-contain"
								src="/assets/images/partners/mack.svg"
							/>
						</div>
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"100px"}
								className="object-contain"
								src="/assets/images/partners/bomag.svg"
							/>
						</div>
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"50px"}
								className="object-contain"
								src="/assets/images/partners/cummins.svg"
							/>
						</div>
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"150px"}
								className="object-contain"
								src="/assets/images/partners/pai.svg"
							/>
						</div>
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"100px"}
								className="object-contain"
								src="/assets/images/partners/thermochill.png"
							/>
						</div>
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"100px"}
								className="object-contain"
								src="/assets/images/partners/dynapac.png"
							/>
						</div>
						<div className="flex items-center  ml-2">
							<Image
								width={"150px"}
								height={"100px"}
								className="object-contain"
								src="/assets/images/partners/power.png"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Partners;
