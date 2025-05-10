import { ProductType } from "@prisma/client";
import { db } from "./db.config";

interface SKUConfig {
	prefix: string;
	yearFormat: "full" | "short";
	paddingLength: number;
	separator: string;
}

class SKUGenerationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "SKUGenerationError";
	}
}

export class SKUGenerator {
	private static instance: SKUGenerator | null = null;

	private defaultConfig: SKUConfig = {
		prefix: "PRD",
		yearFormat: "full",
		paddingLength: 4,
		separator: "-",
	};

	private categoryPrefixes: Record<ProductType, string> = {
		TRUCK: "MGT",
		PART: "MGP",
	};

	private constructor() {}

	public static async getInstance(): Promise<SKUGenerator> {
		if (!SKUGenerator.instance) {
			SKUGenerator.instance = new SKUGenerator();
		}
		return SKUGenerator.instance;
	}

	public async generateSKU(
		productType: ProductType,
		config?: Partial<SKUConfig>
	): Promise<string> {
		try {
			const finalConfig = { ...this.defaultConfig, ...config };
			const prefix = this.categoryPrefixes[productType] || finalConfig.prefix;

			const year = new Date().getFullYear();
			const yearStr =
				finalConfig.yearFormat === "short"
					? year.toString().slice(-2)
					: year.toString();

			const count = await this.getProductTypeCount(productType);
			const sequentialNumber = (count + 1)
				.toString()
				.padStart(finalConfig.paddingLength, "0");

			const sku = [prefix, yearStr, sequentialNumber].join(
				finalConfig.separator
			);

			// Ensure SKU is unique
			const exists = await this.isSKUExists(sku);
			if (exists) {
				return this.generateSKU(productType, {
					...config,
					paddingLength: finalConfig.paddingLength + 1,
				});
			}

			return sku;
		} catch (error) {
			throw new SKUGenerationError(
				`Failed to generate SKU: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		}
	}

	public async isSKUExists(sku: string): Promise<boolean> {
		const product = await db.product.findUnique({
			where: { sku },
		});
		return !!product;
	}

	private async getProductTypeCount(productType: ProductType): Promise<number> {
		try {
			return await db.product.count({
				where: { productType },
			});
		} catch (error) {
			console.error("Error fetching product count:", error);
			return 0;
		}
	}

	public validateSKU(sku: string): boolean {
		const skuRegex = /^[A-Z]{3}-\d{2,4}-\d{1,4}$/;
		return skuRegex.test(sku);
	}

	public parseSKU(sku: string): {
		prefix: string;
		year: string;
		sequence: string;
	} | null {
		const parts = sku.split("-");
		if (parts.length !== 3) return null;

		return {
			prefix: parts[0],
			year: parts[1],
			sequence: parts[2],
		};
	}
}
