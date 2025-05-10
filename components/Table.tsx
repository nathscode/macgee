"use client";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

export default function BasicTable({ data }: any) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [filtering, setFiltering] = useState("");

	const columns = [
		{
			header: "Name",
			accessorKey: "name",
		},
		{
			header: "Model",
			accessorKey: "model",
			cell: ({ row }: any) => (
				<span>
					{row.original.specifications.model} /{" "}
					{row.original.specifications.manufacturer}{" "}
				</span>
			),
		},
		{
			header: "Category",
			accessorKey: "category",
		},
		{
			header: "Action",
			accessorKey: "action",
			cell: ({ row }: any) => (
				<span className="inline-flex items-center justify-center space-x-4">
					<Link
						className="text-blue-500 hover:underline"
						target={"_blank"}
						href={`/inventory/${row.original.id}`}
					>
						View
					</Link>
					<Link
						className="text-brand hover:underline"
						href={`/dashboard/inventories/${row.original.id}`}
					>
						Edit
					</Link>
				</span>
			),
		},
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting: sorting,
			globalFilter: filtering,
		},
		onSortingChange: setSorting,
		onGlobalFilterChange: setFiltering,
	});

	return (
		<div className="relative overflow-x-auto">
			<div className="flex flex-col w-full my-5">
				<input
					type="text"
					value={filtering}
					className="rounded-md appearance-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand/50 focus:border-brand/50 focus:z-10 !text-base"
					onChange={(e) => setFiltering(e.target.value)}
					placeholder="Search inventory"
				/>
			</div>
			<table className="w-full text-sm text-left text-gray-500 table-auto">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									className="px-6 py-3"
									key={header.id}
									onClick={header.column.getToggleSortingHandler()}
								>
									{header.isPlaceholder ? null : (
										<div>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{{
												asc: " 🔼",
												desc: " 🔽",
											}[header.column.getIsSorted() as string] ?? null}
										</div>
									)}
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="bg-white border-b">
							{row.getVisibleCells().map((cell) => (
								<td
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
									key={cell.id}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex items-center gap-2">
				<button
					className="flex items-center justify-center h-8 px-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-l cursor-pointer hover:bg-gray-300"
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					<svg
						className="w-3.5 h-3.5 mr-2"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 5H1m0 0 4 4M1 5l4-4"
						/>
					</svg>
					Prev
				</button>
				<button
					className="p-1 border rounded"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{"<"}
				</button>
				<button
					className="p-1 border rounded"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{">"}
				</button>
				<button
					className="flex items-center justify-center h-8 px-3 text-sm font-medium text-gray-800 bg-gray-200 border-0 border-l border-gray-500 rounded-r cursor-pointer hover:bg-gray-300"
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					Next
					<svg
						className="w-3.5 h-3.5 ml-2"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 5h12m0 0L9 1m4 4L9 9"
						/>
					</svg>
				</button>
				<span className="flex items-center gap-1">
					<div>Page</div>
					<strong>
						{table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
					</strong>
				</span>
			</div>
		</div>
	);
}
