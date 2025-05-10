"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi2";

import { cn } from "@/utils/helpers/cn";

const Navbar = () => {
	const pathname = usePathname();
	const params = useParams();
	const userId = true;

	if (!userId) {
		redirect("/login");
	}

	const routes = [
		{
			href: `/dashboard`,
			label: "Overview",
			active: pathname === `/`,
		},
		{
			href: `/dashboard/inventories`,
			label: "Inventory",
			active: pathname === `inventory`,
		},
	];

	const links = [{ href: "/sign-out", name: "Sign out" }];

	return (
		<div className="border-b">
			<div className="flex items-center h-16 px-4">
				<div className="relative flex justify-between w-full mx-auto overflow-hidden max-w-7xl">
					<nav className="flex items-center justify-center w-full space-x-4 text-center lg:space-x-6">
						{routes.map((route) => (
							<Link
								key={route.label}
								href={route.href}
								className={cn(
									"text-sm font-medium transition-colors hover:text-brand",
									route.active
										? "text-black dark:text-white"
										: "text-muted-foreground"
								)}
							>
								{route.label}
							</Link>
						))}
					</nav>
					<div className="fixed px-4 right-1 top-5">
						<Popover className="relative">
							{({ open }) => (
								<>
									<Popover.Button
										className={`
                ${
									open ? "" : "text-opacity-90"
								} inline-flex items-center justify-center
               `}
									>
										<span className="inline-flex items-center justify-center w-8 h-8 text-white bg-gray-800 rounded-full">
											N
										</span>

										<HiChevronDown
											className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
											aria-hidden="true"
										/>
									</Popover.Button>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-200"
										enterFrom="opacity-0 translate-y-1"
										enterTo="opacity-100 translate-y-0"
										leave="transition ease-in duration-150"
										leaveFrom="opacity-100 translate-y-0"
										leaveTo="opacity-0 translate-y-1"
									>
										<Popover.Panel className="absolute z-10 w-[200px] px-4 mt-3 transform -translate-x-1/2 w-50 left-1/2 sm:px-0 lg:max-w-3xl">
											<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
												<div className="relative w-full p-5 bg-white">
													{links.map((item) => (
														<a
															key={item.name}
															onClick={() => signOut()}
															className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 hover:cursor-pointer"
														>
															<div className="ml-4">
																<p className="text-sm font-medium text-gray-900">
																	{item.name}
																</p>
															</div>
														</a>
													))}
												</div>
											</div>
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
