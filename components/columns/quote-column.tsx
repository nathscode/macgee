"use client";

import { formatDateTime } from "@/lib/utils";
import { QuoteWithExtras } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const QuoteColumns: ColumnDef<QuoteWithExtras>[] = [
	{
		accessorKey: "sn",
		header: "SN",
		cell: ({ row }) => <span>{row.index + 1}</span>,
	},
	{
		accessorKey: "referenceCode",
		header: "reference",
		cell: ({ row }) => <span>{row.original.referenceCode}</span>,
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
		accessorKey: "Date",
		header: "Date",
		cell: ({ row }) => formatDateTime(row.original.createdAt!.toString()!),
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => (
			<Link
				href={`/dashboard/quotes/${row.original.id}`}
				className="hover:text-brand"
			>
				View
			</Link>
		),
	},
];
