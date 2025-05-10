"use client";

import { formatDateTime, formatPrice } from "@/lib/utils";
import { OrderWithExtras } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Badge from "../common/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

export const OrderColumns: ColumnDef<OrderWithExtras>[] = [
	{
		accessorKey: "sn",
		header: "SN",
		cell: ({ row }) => <span>{row.index + 1}</span>,
	},
	{
		accessorKey: "orderNumber",
		header: "order Number",
		cell: ({ row }) => (
			<Link
				href={`/dashboard/orders/${row.original.id}`}
				className="hover:text-brand"
			>
				{row.original.orderNumber}
			</Link>
		),
	},
	{
		accessorKey: "Name",
		header: "Name",
		cell: ({ row }) => row.original.customer?.businessName,
	},
	{
		accessorKey: "Email",
		header: "Email",
		cell: ({ row }) => row.original.customer?.name,
	},
	{
		accessorKey: "total",
		header: "Total",
		cell: ({ row }) => (
			<span>{formatPrice(row.original.subtotal.toString())}</span>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<Badge status={row.original.status} text={row.original.status} />
		),
	},
	{
		accessorKey: "Date",
		header: "Date",
		cell: ({ row }) => formatDateTime(row.original.date!.toString()!),
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
