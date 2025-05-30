import Image from "next/image";
import Link from "next/link";
import React from "react";

const Gallery = () => {
	return (
		<section className="works bg-[#161e46]">
			<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
				<div className="flex flex-col items-center justify-center lg:flex-row">
					<div className="mb-6 lg:mb-0 lg:w-2/5 lg:pr-5">
						<h5 className="mb-6 text-4xl font-extrabold leading-none text-white">
							Our Notable Partners and happy clients
						</h5>
						<p className="mb-6 text-[#b3bdbd] font-normal text-base leading-[20px] ">
							At Macgee, our primary focus lies in delivering exceptional
							quality and unmatched durability. With a view to fulfilling your
							exacting demands, we have partnered with renowned brands.
						</p>
						<div className="block mt-4">
							<Link
								href="/gallery"
								className="px-3 py-2 text-sm uppercase transition border rounded-md border-slate-300 text-slate-300 hover:bg-brand hover:border-brand hover:text-white"
							>
								Visit Gallery
							</Link>
						</div>
					</div>
					<div className="w-full lg:w-3/5">
						<div className="container px-5 py-2 mx-auto lg:px-32">
							<div className="flex flex-col flex-wrap justify-center">
								<div className="relative w-full h-[250px] p-1 md:p-2">
									<Image
										alt="happy customer from macgee"
										className="block object-cover object-center w-full h-full rounded-lg"
										src="/assets/images/clients/9.jpg"
										fill
									/>
								</div>
							</div>
							<div className="flex flex-wrap justify-center gap-2 mt-4 sm:gap-4">
								<div className="relative w-[48%] h-[250px] p-1 md:p-2">
									<Image
										alt="Macgee ceo with current Governor of Delta state"
										className="block object-cover object-center w-full h-full rounded-lg"
										src="/assets/images/clients/1.jpg"
										fill
									/>
								</div>
								<div className="relative w-[48%] h-[250px] p-1 md:p-2">
									<Image
										alt="Macgee ceo with PIA partners"
										className="block object-cover object-center w-full h-full rounded-lg"
										src="/assets/images/clients/6.jpg"
										fill
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Gallery;
