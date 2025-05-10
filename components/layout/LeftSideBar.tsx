"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const LeftSideBar = () => {
	const pathname = usePathname();
	return (
		<div className="h-screen left-0 top-0 fixed p-10 flex flex-col gap-16 shadow-xl max-lg:hidden">
			<Image
				src={"/assets/images/logo/macgee.jpeg"}
				alt="logo"
				width={150}
				height={70}
			/>

			<div className="flex flex-col gap-x-2 gap-y-8 w-full">
				{navLinks.map((link) => (
					<Link
						href={link.url}
						key={link.label}
						className={`flex justify-start items-center gap-4 font-medium px-2 w-full  ${
							pathname === link.url
								? "border-l-2 border-red-600 bg-red-50"
								: "text-grey-800"
						}`}
					>
						{link.icon} <p>{link.label}</p>
					</Link>
				))}
				<Button onClick={() => signOut({ callbackUrl: "/" })} type="button">
					Log out
				</Button>
			</div>
		</div>
	);
};

export default LeftSideBar;
