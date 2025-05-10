"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArchiveDrawerFill } from "react-icons/ri";

type Props = {
	className?: string;
};

const routes = [
	{
		icon: <RiArchiveDrawerFill className="w-5 h-5 mr-2" />,
		label: "Inventory",
		href: "/dashboard/inventories",
	},
	{
		icon: <Tag className="w-5 h-5 mr-2" />,
		label: "Product",
		href: "/dashboard/inventories/product",
	},
];

const InventoriesHeader = ({ className }: Props) => {
	const pathname = usePathname();

	return (
		<div className="relative">
			<ScrollArea className="max-w-[350px] lg:max-w-none">
				<div
					className={cn(" flex justify-start h-full items-center", className)}
				>
					{routes.map((route) => {
						return (
							<Link
								href={route.href}
								key={route.label}
								className={cn(
									"flex items-center justify-center px-5 py-3 hover:text-brand hover:border-b-2 hover:border-brand",
									pathname === route.href
										? "border-b-2 border-brand fill-brand font-semibold text-brand"
										: "font-medium text-muted-foreground fill-muted-foreground"
								)}
							>
								{route.icon}
								{route.label}
							</Link>
						);
					})}
				</div>
				<ScrollBar orientation="horizontal" className="invisible" />
			</ScrollArea>
		</div>
	);
};

export default InventoriesHeader;
