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
							<Link href="/gallery">
								<a className="px-3 py-2 text-sm uppercase transition border rounded-md border-slate-300 text-slate-300 hover:bg-brand hover:border-brand hover:text-white">
									Visit Gallery
								</a>
							</Link>
						</div>
					</div>
					<div className="w-full lg:w-3/5">
						<div class="container mx-auto px-5 py-2 lg:px-32">
							<div class="flex flex-wrap flex-col justify-center">
								<div class="relative w-full h-[250px] p-1 md:p-2">
									<Image
										alt="happy customer from macgee"
										class="block h-full w-full rounded-lg object-cover object-center"
										src="/assets/images/clients/9.jpg"
										layout="fill"
									/>
								</div>
							</div>
							<div class="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
								<div class="relative w-[48%] h-[250px] p-1 md:p-2">
									<Image
										alt="Macgee ceo with current Governor of Delta state"
										class="block h-full w-full rounded-lg object-cover object-center"
										src="/assets/images/clients/1.jpg"
										layout="fill"
									/>
								</div>
								<div class="relative w-[48%] h-[250px] p-1 md:p-2">
									<Image
										alt="Macgee ceo with PIA partners"
										class="block h-full w-full rounded-lg object-cover object-center"
										src="/assets/images/clients/6.jpg"
										layout="fill"
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
