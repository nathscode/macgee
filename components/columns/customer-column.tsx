"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SafeCustomer } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Badge from "../common/badge";
import { Button } from "../ui/button";

export const CustomerColumns: ColumnDef<SafeCustomer>[] = [
	{
		accessorKey: "sn",
		header: "SN",
		cell: ({ row }) => <span>{row.index + 1}</span>,
	},
	{
		accessorKey: "id",
		header: "id Number",
		cell: ({ row }) => (
			<Link
				href={`/dashboard/customers/${row.original.id}`}
				className="hover:text-brand"
			>
				{row.original.id}
			</Link>
		),
	},
	{
		accessorKey: "Name",
		header: "Name",
		cell: ({ row }) => row.original.name,
	},
	{
		accessorKey: "Email",
		header: "Email",
		cell: ({ row }) => row.original.email,
	},
	{
		accessorKey: "BusinessName",
		header: "Business Name",
		cell: ({ row }) => row.original.businessName,
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
