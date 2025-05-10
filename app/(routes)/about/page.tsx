import Image from "next/image";
import PageWrapper from "@/components/layout/page-wrapper";
import Wrapper from "@/components/layout/wrapper";

function About() {
	return (
		<Wrapper>
			<PageWrapper page="About" path="/about">
				<div className="bg-[#252323]">
					<div className="content-wrapper">
						<section className="pager-body">
							<div className="pager-body__inner">
								<div className="pager-body__content">
									<h2 className="!text-white">Introduction</h2>
									<p className="!text-slate-300">
										The growing trends of digital transformation and industry
										machinery mark a significant change in how we work and
										engage with our customers. These emerging technologies
										provide advanced and disruptive industrial equipment
										solutions that support the creation,production, and delivery
										of sophisticated and efficient machinery, equipment, and
										components.
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
										width={500}
										height={400}
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
							<h1 className="mb-5 text-5xl font-semibold text-gray-800 uppercase">
								About <span className="italic underline text-brand">Us</span>
							</h1>
							<div className="flex flex-col items-start justify-start gap-5 lg:flex-row">
								<div className="flex w-full sm:hidden sm:w-1/2">
									<Image
										className=""
										src="/assets/images/about/about-1.png"
										width={500}
										height={180}
										alt=""
									/>
								</div>
								<div className="w-full sm:w-1/2">
									<div className="flex items-center justify-center w-16 h-16 text-white rounded-full bg-brand">
										<span className="text-2xl text-center">01</span>
									</div>
									<div className="flex flex-col pl-0 mt-3 sm:mt-4 sm:pl-16">
										<p className="text-gray-800 font-normal text-[15px] leading-6">
											MacGee Trucks and Equipment Was founded with the belief
											that performance, availability, and meeting our
											customers&lsquo; needs are paramount to our business.
											MacGee maintains a commitment to technological innovation
											to retain its leadership in a highly competitive global
											marketplace.
										</p>
									</div>
								</div>
								<div className="hidden w-full sm:flex sm:w-1/2">
									<Image
										className=""
										src="/assets/images/about/about-1.png"
										width={"500"}
										height={"180"}
										alt=""
									/>
								</div>
							</div>
							<div className="flex flex-col items-start justify-start gap-5 my-10 lg:flex-row">
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
									<div className="flex items-center justify-center w-16 h-16 text-white rounded-full bg-brand">
										<span className="text-2xl text-center">02</span>
									</div>
									<div className="flex flex-col pl-0 mt-3 sm:mt-0 sm:pl-16">
										<p className="text-gray-800 font-normal text-[15px] leading-6">
											Our customers expect high-class power machinery and
											equipment that provides unique capabilities, meets
											exacting specifications, and performs with reliable
											precision. We can steer our customers toward optimal
											product configurations that meet their specific needs and
											fall within the scope of your production capabilities.
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
							<div className="flex flex-col items-start justify-start gap-5 my-10 lg:flex-row">
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
											<h2 className="mb-0 text-2xl text-white uppercase">
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
							<div className="flex flex-col items-start justify-start gap-5 my-10 lg:flex-row">
								<div className="flex-col hidden w-full sm:w-1/2 sm:flex">
									<h1 className="text-5xl font-semibold text-white uppercase">
										Vision
									</h1>
									<h1 className="text-5xl italic font-semibold underline uppercase text-brand">
										mission
									</h1>
								</div>
								<div className="w-full sm:w-1/2">
									<div className="flex justify-start">
										<div className="inline-flex justify-center  px-5 py-5 h-[70px] relative items-center text-white bg-brand">
											<span className="text-2xl text-center ">02</span>
										</div>
										<div className="flex flex-col mt-0 ml-5">
											<h2 className="mb-0 text-2xl text-white uppercase">
												mission
											</h2>
											<p className="text-slate-300 mt-2 font-normal text-[15px] leading-6">
												To be acknowledged as the top supplier of high-quality
												new and used equipment, parts, and service support to
												the earth-moving business globally.
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
							<h1 className="text-5xl font-semibold text-gray-800 uppercase">
								product and{" "}
								<span className="italic underline text-brand">services</span>
							</h1>
							<div className="flex flex-col items-start justify-start gap-5 lg:flex-row">
								<div className="w-full sm:w-3/5">
									<div className="flex flex-col mt-5">
										<p className="text-base font-semibold text-gray-900">
											MacGee provides a comprehensive range of services;
										</p>
										<ul className=" pl-5 my-4 text-gray-800 font-normal text-[15px] leading-6">
											<li className="mb-3 list-disc">
												MacGee Trucks and Equipment specializes in buying,
												selling, importing, and exporting excavators, wheel
												loaders, crawlers, dozers, loaders, back holes, track
												loaders, graders, compactors, and heavy lift equipment.
											</li>
											<li className="mb-3 list-disc">
												We also sell genuine parts, both new and refurbished.
											</li>
											<li className="mb-3 list-disc">
												We provide a wide range of different types of equipment
												from various manufacturers,including Caterpillar, Mack,
												Volvo, Bobcat, Dynapac, Bomag, PAI, Mitsubishi
												Electric,Toshiba, General Electric, JCB, and John Deere.
												Additionally, we help our clients with their domestic
												and international logistics.
											</li>
											<li className="mb-3 list-disc">
												We travel worldwide to conduct on-site inspections and
												purchase the highest-quality, cheapest equipment to
												provide to cherished consumers.
											</li>
										</ul>
										<p className="text-base font-semibold text-gray-900">
											Our sales consultants consistently show their excellence
											in customer care by going above and beyond to ensure all
											needs and expectations are met. They are efficient from
											the first point of contact, providing a positive customer
											experience and monitoring service delivery standards.
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
				<div className="bg-[#252323]">
					<div className="content-wrapper">
						<section className="pager-body">
							<div className="flex flex-col items-start justify-start gap-5 my-10 lg:flex-row">
								<div className="w-full sm:w-1/2">
									<Image
										className="w-full h-full"
										src="/assets/images/about/metrics.png"
										width={"500"}
										height={"250"}
										alt=""
									/>
								</div>
								<div className="w-full sm:w-1/2">
									<h2 className="!text-brand text-3xl  sm:text-5xl font-bold">
										17 YEARS STILL GROWING
									</h2>
									<div className="flex flex-wrap justify-start gap-4 mt-10">
										<div className="flex flex-col w-full sm:w-[30%] justify-between p-5 border  rounded bg-white/20">
											<h4 className="m-0 text-4xl font-semibold text-white">
												2000+
											</h4>
											<p className="mt-1 font-normal uppercase text-slate-300">
												Trucks and parts sold
											</p>
										</div>
										<div className="flex flex-col w-full sm:w-[30%] justify-between p-5 border  rounded bg-white/20">
											<h4 className="m-0 text-4xl font-semibold text-white">
												3000+
											</h4>
											<p className="mt-1 font-normal uppercase text-slate-300">
												Equipments sold
											</p>
										</div>
										<div className="flex flex-col w-full sm:w-[30%] justify-between p-5 border  rounded bg-white/20">
											<h4 className="m-0 text-4xl font-semibold text-white">
												200+
											</h4>
											<p className="mt-1 font-normal uppercase text-slate-300">
												Satisfied customers
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col items-center justify-center gap-5 my-10 lg:flex-row">
								<div className="block w-full sm:hidden sm:w-1/2">
									<Image
										className="w-full h-full rounded-lg"
										src="/assets/images/about/ceo.jpg"
										width={"500"}
										height={"350"}
										alt=""
									/>
								</div>
								<div className="w-full sm:w-1/2">
									<h2 className="!text-white text-3xl uppercase  sm:text-5xl font-bold">
										CEO&lsquo;S CORNER
									</h2>
									<h3 className="my-1 text-lg font-semibold text-slate-100">
										Mr. Mark Aghogho Rhima
										<br />
										Chief Executive Officer
									</h3>
									<p className="text-slate-300 mt-2 font-normal text-[14px] leading-6">
										Mr. Mark is an expert in supply chain management with
										knowledge of procuring vehicles, trucks,equipment, and
										logistics. In Nigeria, Mr. Mark graduated with a Bachelor of
										Business Administration from the University of Lagos. Before
										relocating to the United States to pursue his lifetime
										enthusiasm to learn and build industrial skills in the
										vehicle and equipment supply chain business, he worked as a
										sales executive and security officer at SELCO Building
										Material Company in Manchester, United Kingdom, between 2002
										and 2007. He started his business journey into the
										automotive sector with Bill Lyons Crushers Incorporated, New
										Haven, New York,to realize his entrepreneurial aspirations.
										There, he gained and honed substantial industry knowledge in
										the sales, repair, and maintenance of trucks, heavy-duty
										machinery, and earth-moving machinery.
									</p>
									<p className="text-slate-300 mt-2 font-normal text-[14px] leading-6">
										To meet the import and supply needs of the Nigerian market,
										he established MACID Autos and Equipment Company in 2007.
										MACID Autos and Equipment was re-engineered, renamed, and
										incorporated as MacGee Trucks and Equipment to achieve
										Mark&lsquo;s goals of being a service leader in the auto and
										equipment supply chain in Nigeria, to meet the growing needs
										of his customers and clients in the oil and gas industry,
										and to increase strategic partnerships with significant
										dealers worldwide. Cat, Mack, Caledonia Diesel, Leon
										Equipment, Weaco, Fiori,Cummins Diesel, 3fold Trucks &
										Equipment, Pete Global Heavy Equipment, Thompson Pumps,GE,
										Mitsubishi Electric, Toshiba, Shelton Motors, UK, and Thermo
										Chill, South Africa, are just a few of the companies that
										MacGee is a significant partner with.
									</p>
								</div>
								<div className="hidden w-full sm:block sm:w-1/2">
									<Image
										className="w-full h-full rounded-lg"
										src="/assets/images/about/ceo.jpg"
										width={"500"}
										height={"350"}
										alt=""
									/>
								</div>
							</div>
						</section>
					</div>
				</div>
			</PageWrapper>
		</Wrapper>
	);
}

export default About;
