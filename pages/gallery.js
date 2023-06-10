import Image from "next/image";
import PageWrapper from "../components/layout/page-wrapper";

function Gallery() {
	return (
		<PageWrapper page="Gallery" path="/gallery">
			<section className="inventory">
				<div className="content-wrapper">
					<div className="inventory__header">
						<h2>Happy Customer at the Office </h2>
					</div>
					<div class="flex flex-col md:flex-row gap-2">
						<div class="relative w-full sm:w-1/2 h-[350px] group">
							<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
								<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
									<h4 className="text-sm font-semibold text-center text-white">
										Happy customer bought heavy duty cat batteries Inbox
									</h4>
								</div>
							</div>
							<Image
								alt="happy customer from macgee"
								class="block h-full w-full rounded-lg object-cover object-center"
								src="/assets/images/clients/9.jpg"
								layout="fill"
							/>
						</div>
						<div class="relative w-full sm:w-1/2">
							<div class="flex flex-col gap-2 sm:flex-row flex-wrap justify-center  sm:gap-4">
								<div class="relative w-full sm:w-[48%] h-[350px] group">
									<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
										<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
											<h4 className="text-sm font-semibold text-center text-white">
												Ceo with current Governor of Delta state
											</h4>
										</div>
									</div>
									<Image
										alt="Macgee ceo with current Governor of Delta state"
										class="block h-full w-full rounded-lg object-cover object-center"
										src="/assets/images/clients/1.jpg"
										layout="fill"
									/>
								</div>
								<div class="relative w-full sm:w-[48%] h-[350px] group">
									<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
										<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
											<h4 className="text-sm font-semibold text-center text-white">
												Ceo with PIA partner
											</h4>
										</div>
									</div>
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
					<div class="flex flex-wrap justify-between gap-2 mt-3">
						<div class="relative w-full sm:w-[24%] h-[350px] group">
							<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
								<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
									<h4 className="text-sm font-semibold text-center text-white">
										CEO Ebenezer of Ebenco Global
									</h4>
								</div>
							</div>
							<Image
								alt="Ebenezer of Ebenco Global"
								class="block h-full w-full rounded-lg object-cover object-center"
								src="/assets/images/clients/2.jpg"
								layout="fill"
							/>
						</div>
						<div class="relative w-full sm:w-[24%] h-[350px] group">
							<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
								<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
									<h4 className="text-sm font-semibold text-center text-white">
										Mohammad ARI AIG zone 2 lagos
									</h4>
								</div>
							</div>
							<Image
								alt="Macgee ceo with Mohammad ARI AIG zone 2 lagos"
								class="block h-full w-full rounded-lg object-cover object-center"
								src="/assets/images/clients/3.jpg"
								layout="fill"
							/>
						</div>
						<div class="relative w-full sm:w-[24%] h-[350px] group ">
							<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
								<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
									<h4 className="text-sm font-semibold text-center text-white">
										Bankole Olarenwaju, Commissioner of police Interpol Alagbon
										lagos
									</h4>
								</div>
							</div>
							<Image
								alt="Macgee ceo with Bankole Olarenwaju, Commissioner of police Interpol Alagbon lagos"
								class="block h-full w-full rounded-lg object-cover object-center"
								src="/assets/images/clients/4.jpg"
								layout="fill"
							/>
						</div>
						<div class="relative w-full sm:w-[24%] h-[350px] group">
							<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
								<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
									<h4 className="text-sm font-semibold text-center text-white">
										Rainoil ceo, Gabriel Ogbechie
									</h4>
								</div>
							</div>
							<Image
								alt="Macgee ceo with Rainoil ceo, Gabriel Ogbechie"
								class="block h-full w-full rounded-lg object-cover object-center"
								src="/assets/images/clients/10.jpg"
								layout="fill"
							/>
						</div>
						<div class="relative w-full sm:w-[24%] h-[350px] group">
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
								class="block h-full w-full rounded-lg object-cover object-center"
								src="/assets/images/clients/5.jpg"
								layout="fill"
							/>
						</div>
						<div class="relative w-full sm:w-[24%] h-[350px] group">
							<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
								<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
									<h4 className="text-sm font-semibold text-center text-white">
										Horacio ETEROVIC - international sales manager & Olatunbosun
										sales agent.
									</h4>
								</div>
							</div>
							<Image
								alt=" Horacio ETEROVIC - international sales manager & Olatunbosun sales agent"
								class="block h-full w-full rounded-lg object-cover object-center"
								src="/assets/images/clients/6.jpg"
								layout="fill"
							/>
						</div>
						<div class="relative w-full sm:w-[24%] h-[350px] group">
							<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
								<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
									<h4 className="text-sm font-semibold text-center text-white">
										Ceo wiht PAI partners
									</h4>
								</div>
							</div>
							<Image
								alt="ceo with pai agent"
								class="block h-full w-full rounded-lg object-cover object-center"
								src="/assets/images/clients/7.jpg"
								layout="fill"
							/>
						</div>
						<div class="relative w-full sm:w-[24%] h-[350px] group">
							<div className="absolute top-0 left-0 z-10 hidden w-full h-full transition rounded-lg group-hover:flex bg-black/50">
								<div className="relative flex flex-col items-center justify-center h-full p-1 text-white">
									<h4 className="text-sm font-semibold text-center text-white">
										CEO with happy customer
									</h4>
								</div>
							</div>
							<Image
								alt="Macgee ceo with happy customer"
								class="block h-full w-full rounded-lg object-cover object-center"
								src="/assets/images/clients/8.jpg"
								layout="fill"
							/>
						</div>
					</div>
				</div>
			</section>
		</PageWrapper>
	);
}

export default Gallery;
