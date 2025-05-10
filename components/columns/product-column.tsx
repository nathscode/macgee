"use client";

import { formatDateTime } from "@/lib/utils";
import { SafeProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ProductRowActions } from "../table/product-row-action";

export const ProductColumns: ColumnDef<SafeProduct>[] = [
	{
		accessorKey: "sn",
		header: "SN",
		cell: ({ row }) => <span>{row.index + 1}</span>,
	},
	{
		accessorKey: "sku",
		header: "sku",
		cell: ({ row }) => <span>{row.original.sku}</span>,
	},
	{
		accessorKey: "Title",
		header: "Title",
		cell: ({ row }) => row.original.title,
	},
	{
		accessorKey: "Stock",
		header: "Stock",
		cell: ({ row }) => row.original.currentStock,
	},
	{
		accessorKey: "Category",
		header: "Category",
		cell: ({ row }) => {
			if (row.original.category) {
				return <span>{row.original.category}</span>;
			} else {
				return <span>{row.original.productType}</span>;
			}
		},
	},
	{
		accessorKey: "Date",
		header: "Date",
		cell: ({ row }) => formatDateTime(row.original.createdAt!.toString()!),
	},
	{
		id: "actions",
		cell: ({ row }) => <ProductRowActions row={row} />,
	},
];
