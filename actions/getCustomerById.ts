"use server";
import { db } from "@/config/db.config";
import { SafeCustomer } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export default async function getCustomerById(
	id: string
): Promise<SafeCustomer | null> {
	noStore();
	if (!id) {
		return null;
	}
	try {
		const customer = await db.customer.findUnique({
			where: { id },
		});

		if (!customer) {
			return null;
		}

		const plainCustomer = JSON.parse(JSON.stringify(customer));
		return plainCustomer;
	} catch (error) {
		console.log("Error in fetching customer id", error);
		return null;
	}
}
