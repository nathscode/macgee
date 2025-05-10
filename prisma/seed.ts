import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
	const password = "cook1234";
	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);
	try {
		const user = await prisma.user.create({
			data: {
				email: "macgeeequipments@gmail.com",
				password: hashedPassword,
				name: "macgeee",
				username: "macgeee",
				verified: true,
				role: "ADMIN",
			},
		});
		if (user) {
			console.log(`Seeded data successfully`);
		}
	} catch (error) {
		console.error(`Error seeding data`, error);
	}
}
main()
	.catch((e) => console.error(e))
	.finally(async () => await prisma.$disconnect());
