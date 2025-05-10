import Image from "next/image";
import PageWrapper from "@/components/layout/page-wrapper";
import Wrapper from "@/components/layout/wrapper";

function Gallery() {
	return (
		<Wrapper>
			<PageWrapper page="Gallery" path="/gallery">
				<section className="inventory">
					<div className="content-wrapper">
						<div className="inventory__header">
							<h2>Happy Customer at the Office </h2>
						</div>
						<div className="flex flex-col gap-2 md:flex-row">
							<div className="relative w-full sm:w-1/2 h-[350px] group">
								<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
									<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
										<h4 className="text-sm font-semibold text-center text-white">
											Happy customer bought 200AH heavy duty Cat OEM Batteries
										</h4>
									</div>
								</div>
								<Image
									alt="Happy customer bought 200AH heavy duty Cat OEM Batteries"
									className="block object-cover object-center w-full h-full rounded-lg"
									src="/assets/images/clients/9.jpg"
									layout="fill"
								/>
							</div>
							<div className="relative w-full sm:w-1/2">
								<div className="flex flex-col flex-wrap justify-center gap-2 sm:flex-row sm:gap-4">
									<div className="relative w-full sm:w-[48%] h-[350px] group">
										<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
											<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
												<h4 className="text-sm font-semibold text-center text-white">
													CEO with the Governor of Delta state. His Excellence
													Sheriff Oborevwori
												</h4>
											</div>
										</div>
										<Image
											alt="CEO with the Governor of Delta state.His Excellence Sheriff Oborevwori"
											className="block object-cover object-center w-full h-full rounded-lg"
											src="/assets/images/clients/1.jpg"
											layout="fill"
										/>
									</div>
									<div className="relative w-full sm:w-[48%] h-[350px] group">
										<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
											<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
												<h4 className="text-sm font-semibold text-center text-white">
													CEO with PAI industries international sales agent.
													Horacio & Olatunbosun
												</h4>
											</div>
										</div>
										<Image
											alt="CEO with PAI industries international sales agent. Horacio  & Olatunbosun"
											className="block object-cover object-center w-full h-full rounded-lg"
											src="/assets/images/clients/6.jpg"
											layout="fill"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-wrap justify-between gap-2 mt-3">
							<div className="relative w-full sm:w-[24%] h-[350px] group">
								<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
									<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
										<h4 className="text-sm font-semibold text-center text-white">
											CEO with Enebezer , Ebenco global
										</h4>
									</div>
								</div>
								<Image
									alt="CEO with Enebezer , Ebenco global"
									className="block object-cover object-center w-full h-full rounded-lg"
									src="/assets/images/clients/2.jpg"
									layout="fill"
								/>
							</div>
							<div className="relative w-full sm:w-[24%] h-[350px] group">
								<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
									<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
										<h4 className="text-sm font-semibold text-center text-white">
											Mohammad ARI AIG zone 2 lagos
										</h4>
									</div>
								</div>
								<Image
									alt="Macgee ceo with Mohammad ARI AIG zone 2 lagos"
									className="block object-cover object-center w-full h-full rounded-lg"
									src="/assets/images/clients/3.jpg"
									layout="fill"
								/>
							</div>
							<div className="relative w-full sm:w-[24%] h-[350px] group ">
								<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
									<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
										<h4 className="text-sm font-semibold text-center text-white">
											Bankole Olarenwaju, Commissioner of police Interpol
											Alagbon lagos
										</h4>
									</div>
								</div>
								<Image
									alt="Macgee ceo with Bankole Olarenwaju, Commissioner of police Interpol Alagbon lagos"
									className="block object-cover object-center w-full h-full rounded-lg"
									src="/assets/images/clients/4.jpg"
									layout="fill"
								/>
							</div>
							<div className="relative w-full sm:w-[24%] h-[350px] group">
								<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
									<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
										<h4 className="text-sm font-semibold text-center text-white">
											Rainoil ceo, Gabriel Ogbechie
										</h4>
									</div>
								</div>
								<Image
									alt="Macgee ceo with Rainoil ceo, Gabriel Ogbechie"
									className="block object-cover object-center w-full h-full rounded-lg"
									src="/assets/images/clients/10.jpg"
									layout="fill"
								/>
							</div>
							<div className="relative w-full sm:w-[24%] h-[350px] group">
								<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
									<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
										<h4 className="text-sm font-semibold text-center text-white">
											Macgee trucks & equipment crew with PAI sales agent, mr
											Olatunbosun
										</h4>
									</div>
								</div>
								<Image
									alt="PAI Agent"
									className="block object-cover object-center w-full h-full rounded-lg"
									src="/assets/images/clients/5.jpg"
									layout="fill"
								/>
							</div>

							<div className="relative w-full sm:w-[24%] h-[350px] group">
								<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
									<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
										<h4 className="text-sm font-semibold text-center text-white">
											Celi & Marcelo from panegossi Brazil
										</h4>
									</div>
								</div>
								<Image
									alt="Celi & Marcelo from panegossi Brazil"
									className="block object-cover object-center w-full h-full rounded-lg"
									src="/assets/images/clients/7.jpg"
									layout="fill"
								/>
							</div>
							<div className="relative w-full sm:w-[24%] h-[350px] group">
								<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
									<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
										<h4 className="text-sm font-semibold text-center text-white">
											Installation of water chillers at Transcorp power
											generation, Ughelli 2015
										</h4>
									</div>
								</div>
								<Image
									alt="installation of water chillers at Transcorp power generation, Ughelli 2015"
									className="block object-cover object-center w-full h-full rounded-lg"
									src="/assets/images/clients/8.jpg"
									layout="fill"
								/>
							</div>
							<div className="relative w-full sm:w-[24%] h-[350px] group">
								<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
									<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
										<h4 className="text-sm font-semibold text-center text-white">
											Ifeanyi Nwanchukwu CEO Ify Bros Constructions
										</h4>
									</div>
								</div>
								<Image
									alt="Ifeanyi Nwanchukwu CEO Ify Bros Constructions"
									className="block object-cover object-center w-full h-full rounded-lg"
									src="/assets/images/about/11.jpg"
									layout="fill"
								/>
							</div>
						</div>
					</div>
				</section>
			</PageWrapper>
		</Wrapper>
	);
}

export default Gallery;
