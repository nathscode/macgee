"use server";
import { db } from "@/config/db.config";
import { QuoteWithExtras } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export default async function fetchQuoteById(
	id: string
): Promise<QuoteWithExtras | null> {
	noStore();
	if (!id) {
		return null;
	}
	try {
		const quote = await db.quote.findFirst({
			where: { id: id },
			include: {
				product: true,
			},
		});

		if (!quote) {
			return null;
		}

		const plainQuote = JSON.parse(JSON.stringify(quote));
		return plainQuote;
	} catch (error) {
		console.log("Error in fetching quote", error);
		return null;
	}
}
