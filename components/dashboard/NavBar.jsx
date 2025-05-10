import { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { redirect } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }) {
	const pathname = usePathname();

	const routes = [
		{
			href: `/`,
			label: "Overview",
			active: pathname === `/dashboard`,
		},
		{
			href: `/inventory`,
			label: "Inventory",
			active: pathname === `inventory`,
		},
	];

	return (
		<div className="border-b">
			<div className="flex items-center h-16 px-4">
				<nav
					className={cn("flex items-center space-x-4 lg:space-x-6", className)}
					{...props}
				>
					{routes.map((route) => (
						<Link
							key={route.label}
							href={route.href}
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								route.active
									? "text-black dark:text-white"
									: "text-muted-foreground"
							)}
						>
							{route.label}
						</Link>
					))}
				</nav>
			</div>
		</div>
	);
}
