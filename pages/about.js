import Image from "next/image";
import PageWrapper from "../components/layout/page-wrapper";

function About() {
	return (
		<PageWrapper page="About" path="/about">
			<div className="bg-[#252323]">
				<div className="content-wrapper">
					<section className="pager-body">
						<div className="pager-body__inner">
							<div className="pager-body__content">
								<h2 className="!text-white">Introduction</h2>
								<p className="!text-slate-300">
									The growing trends of digital transformation and industry
									machinery mark a significant change in how we work and engage
									with our customers. These emerging technologies provide
									advanced and disruptive industrial equipment solutions that
									support the creation,production, and delivery of sophisticated
									and efficient machinery, equipment, and components.
									<br /> <br />
									MacGee Trucks and Equipment is an Equipment Solution Company
									registered with the Corporate Affairs Commission in the year
									2007 as Macid Autos and Equipment and rebranded as MacGee
									Trucks and Equipment in 2020, with headquarters located in
									Warri,Delta State, and a USA office situated at 5764 Steven
									Forest Road 424, Columbia, MD, 21045.
								</p>
							</div>
							<div className="pager-body__visual">
								<Image
									className="rounded-tr-[50px]"
									src="/assets/images/hero/about-hero.jpg"
									width={"500px"}
									height={"400"}
									alt=""
								/>
							</div>
						</div>
					</section>
				</div>
			</div>
			<div className="bg-white">
				<div className="content-wrapper">
					<section className="pager-body">
						<h1 className="text-5xl font-semibold uppercase text-gray-800">
							About <span className="text-brand italic underline">Us</span>
						</h1>
						<div className="flex flex-col justify-start items-start lg:flex-row gap-5">
							<div className="w-full flex sm:hidden sm:w-1/2">
								<Image
									className=""
									src="/assets/images/about/about-1.png"
									width={"500"}
									height={"180"}
									alt=""
								/>
							</div>
							<div className="w-full sm:w-1/2">
								<div className="flex justify-center items-center w-16 h-16 text-white bg-brand rounded-full">
									<span className="text-2xl text-center">01</span>
								</div>
								<div className="flex flex-col mt-0 pl-0 sm:pl-16">
									<p className="text-gray-800 font-normal text-[15px] leading-6">
										MacGee Trucks and Equipment Was founded with the belief that
										performance, availability, and meeting our customers' needs
										are paramount to our business. MacGee maintains a commitment
										to technological innovation to retain its leadership in a
										highly competitive global marketplace.
									</p>
								</div>
							</div>
							<div className="w-full hidden sm:flex sm:w-1/2">
								<Image
									className=""
									src="/assets/images/about/about-1.png"
									width={"500"}
									height={"180"}
									alt=""
								/>
							</div>
						</div>
						<div className="flex flex-col my-10 justify-start items-start lg:flex-row gap-5">
							<div className="w-full sm:w-1/2">
								<Image
									className=""
									src="/assets/images/about/about-2.png"
									width={"500"}
									height={"180"}
									alt=""
								/>
							</div>
							<div className="w-full sm:w-1/2">
								<div className="flex justify-center items-center w-16 h-16 text-white bg-brand rounded-full">
									<span className="text-2xl text-center">02</span>
								</div>
								<div className="flex flex-col mt-0 pl-0 sm:pl-16">
									<p className="text-gray-800 font-normal text-[15px] leading-6">
										Our customers expect high-class power machinery and
										equipment that provides unique capabilities, meets exacting
										specifications, and performs with reliable precision. We can
										steer our customers toward optimal product configurations
										that meet their specific needs and fall within the scope of
										your production capabilities.
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
			<div className="bg-[#252323]">
				<div className="content-wrapper">
					<section className="pager-body">
						<div className="flex flex-col my-10 justify-start items-start lg:flex-row gap-5">
							<div className="w-full sm:w-1/2">
								<Image
									className="w-full"
									src="/assets/images/about/mission.png"
									width={"500"}
									height={"250"}
									alt=""
								/>
							</div>
							<div className="w-full sm:w-1/2">
								<div className="flex justify-start">
									<div className="flex justify-center items-center relative px-5 py-5 h-[70px] text-white bg-brand">
										<span className="text-2xl text-center">01</span>
									</div>
									<div className="flex flex-col mt-0 ml-5">
										<h2 className="text-2xl mb-0 text-white uppercase">
											vision
										</h2>
										<p className="text-slate-300 mt-2 font-normal text-[15px] leading-6">
											Our vision is to be a leading global equipment supplier
											committed to enhancing our services and products.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col my-10 justify-start items-start lg:flex-row gap-5">
							<div className="w-full sm:w-1/2 hidden sm:flex flex-col">
								<h1 className="text-5xl font-semibold uppercase text-white">
									Vision
								</h1>
								<h1 className="text-5xl font-semibold uppercase text-brand italic underline">
									mission
								</h1>
							</div>
							<div className="w-full sm:w-1/2">
								<div className="flex justify-start">
									<div className="inline-flex justify-center  px-5 py-5 h-[70px] relative items-center text-white bg-brand">
										<span className="text-2xl text-center ">02</span>
									</div>
									<div className="flex flex-col mt-0 ml-5">
										<h2 className="text-2xl mb-0 text-white uppercase">
											mission
										</h2>
										<p className="text-slate-300 mt-2 font-normal text-[15px] leading-6">
											To be acknowledged as the top supplier of high-quality new
											and used equipment, parts, and service support to the
											earth-moving business globally.
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
			<div className="bg-white">
				<div className="content-wrapper">
					<section className="pager-body">
						<h1 className="text-5xl font-semibold uppercase text-gray-800">
							product and{" "}
							<span className="text-brand italic underline">services</span>
						</h1>
						<div className="flex flex-col justify-start items-start lg:flex-row gap-5">
							<div className="w-full sm:w-3/5">
								<div className="flex flex-col mt-5">
									<p className="text-gray-900 font-semibold text-base">
										MacGee provides a comprehensive range of services;
									</p>
									<ul className=" pl-5 my-4 text-gray-800 font-normal text-[15px] leading-6">
										<li className="list-disc mb-3">
											MacGee Trucks and Equipment specializes in buying,
											selling, importing, and exporting excavators, wheel
											loaders, crawlers, dozers, loaders, back holes, track
											loaders, graders, compactors, and heavy lift equipment.
										</li>
										<li className="list-disc mb-3">
											We also sell genuine parts, both new and refurbished.
										</li>
										<li className="list-disc mb-3">
											We provide a wide range of different types of equipment
											from various manufacturers,including Caterpillar, Mack,
											Volvo, Bobcat, Dynapac, Bomag, PAI, Mitsubishi
											Electric,Toshiba, General Electric, JCB, and John Deere.
											Additionally, we help our clients with their domestic and
											international logistics.
										</li>
										<li className="list-disc mb-3">
											We travel worldwide to conduct on-site inspections and
											purchase the highest-quality, cheapest equipment to
											provide to cherished consumers.
										</li>
									</ul>
									<p className="text-gray-900 font-semibold text-base">
										Our sales consultants consistently show their excellence in
										customer care by going above and beyond to ensure all needs
										and expectations are met. They are efficient from the first
										point of contact, providing a positive customer experience
										and monitoring service delivery standards.
									</p>
								</div>
							</div>
							<div className="w-full sm:w-2/5">
								<Image
									className=""
									src="/assets/images/about/product.png"
									width={"500"}
									height={"500"}
									alt=""
								/>
							</div>
						</div>
					</section>
				</div>
			</div>
		</PageWrapper>
	);
}

export default About;
