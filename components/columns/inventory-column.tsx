"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime } from "@/lib/utils";
import { InventoryLogWithExtras } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

export const InventoryColumns: ColumnDef<InventoryLogWithExtras>[] = [
	{
		accessorKey: "sn",
		header: "SN",
		cell: ({ row }) => <span>{row.index + 1}</span>,
	},
	{
		accessorKey: "Product",
		header: "Product",
		cell: ({ row }) => row.original.product?.title,
	},
	{
		accessorKey: "ProductType",
		header: "ProductType",
		cell: ({ row }) => row.original.product?.productType,
	},
	{
		accessorKey: "Quantity",
		header: "Quantity",
		cell: ({ row }) => row.original.quantity,
	},
	{
		accessorKey: "Type",
		header: "Type",
		cell: ({ row }) => row.original.type,
	},

	{
		accessorKey: "Date",
		header: "Date",
		cell: ({ row }) => formatDateTime(row.original.createdAt!.toString()!),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const reservation = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem>Approve</DropdownMenuItem>
						<DropdownMenuItem>Decline</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
