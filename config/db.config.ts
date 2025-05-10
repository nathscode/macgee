import { getLogger } from "@/lib/backend/logger";
import { PrismaClient } from "@prisma/client";

const logger = getLogger();
declare global {
	var prisma: PrismaClient | undefined;
}

export class PrismaService extends PrismaClient {
	constructor() {
		super();

		if (process.env.NODE_ENV === "production") {
			this.connect();
		} else {
			if (!global.prisma) {
				global.prisma = this;
				this.connect();
			}
			return global.prisma as PrismaService;
		}
	}

	private async connect() {
		try {
			await this.$connect();
			logger.info("✅ Prisma connected");
		} catch (err) {
			logger.error("❌ Prisma connection error", err);
		}
	}

	public async disconnect() {
		try {
			await this.$disconnect();
			logger.info("🛑 Prisma disconnected");
		} catch (err) {
			logger.error("❌ Prisma disconnection error", err);
		}
	}
}

// Export a single instance as db
export const db = new PrismaService();
