"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import ActivateButton from "../common/activate-button";

interface ProductRowActionsProps<TData> {
	row: Row<TData>;
}

export function ProductRowActions<TData>({
	row,
}: ProductRowActionsProps<TData>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
				>
					<MoreHorizontal />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuItem>
					{/* @ts-ignore */}
					<Link href={`/product/${row.original.slug}`}>View</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					{/* @ts-ignore */}
					<Link
						href={`/dashboard/inventories/product/${row.original.slug}/edit`}
					>
						Edit
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					{/* @ts-ignore */}
					<Link
						href={`/dashboard/inventories/product/${row.original.slug}/upload`}
					>
						Edit Upload
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<ActivateButton
						slug={row.original.slug!}
						isActive={row.original.isActive}
					/>
				</DropdownMenuItem>
				<DropdownMenuSeparator />

				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
