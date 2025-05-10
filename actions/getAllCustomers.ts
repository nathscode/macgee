"use server";
import { db } from "@/config/db.config";
import { SafeCustomer } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export const getAllCustomers = async (): Promise<SafeCustomer[] | null> => {
	noStore();

	try {
		const customers = await db.customer.findMany({
			orderBy: { createdAt: "desc" },
		});

		if (!customers) return [];
		const plainCustomers = JSON.parse(JSON.stringify(customers));
		return plainCustomers;
	} catch (error) {
		console.log("[GET_CUSTOMERS]", error);
		return [];
	}
};
