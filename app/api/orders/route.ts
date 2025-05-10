import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/config/db.config";
import { CartItem } from "@/hooks/use-cart";
import { getLogger } from "@/lib/backend/logger";
import {
	generateRandomNumbers,
	handlerNativeResponse,
} from "@/lib/backend/utils";
import { generateRandomString } from "@/lib/utils";
import { OrderItemType } from "@/types";
import {
	InventoryLogType,
	OrderStatus,
	PaymentMethod,
	PaymentStatus,
	ProductType,
} from "@prisma/client";
import { NextRequest } from "next/server";

const logger = getLogger();

// Set safe numeric limits based on Prisma decimal precision
const MAX_DECIMAL_VALUE = 999999999999999999.99; // For precision 10, scale 2
const MIN_DECIMAL_VALUE = -999999999999999999.99;

async function generateUniqueOrderNumberCode(): Promise<string> {
	let orderNumber: string;
	let attempts = 0;
	const maxAttempts = 5;

	do {
		orderNumber = generateRandomNumbers(12);
		attempts++;
		if (attempts >= maxAttempts) {
			throw new Error("Failed to generate unique order number");
		}
	} while (await db.order.findFirst({ where: { orderNumber } }));

	return orderNumber;
}

function validateNumericValue(value: number, fieldName: string): number {
	const numValue = Number(value);
	if (isNaN(numValue)) {
		throw new Error(`Invalid numeric value for ${fieldName}`);
	}
	if (numValue > MAX_DECIMAL_VALUE || numValue < MIN_DECIMAL_VALUE) {
		throw new Error(`${fieldName} value ${numValue} exceeds allowed limits`);
	}
	return numValue;
}

export async function POST(req: NextRequest) {
	try {
		// Parse and validate input data
		const formData = await req.formData();
		const shipping = formData.get("shippingFee") as string;
		const customerId = formData.get("customerId") as string;
		const total = formData.get("total") as string;
		const payable = formData.get("payable") as string;
		const cartItemString = formData.get("carts") as string;

		// Validate required fields
		if (!customerId || !total || !payable || !cartItemString) {
			return handlerNativeResponse(
				{ status: 400, errors: { message: "Missing required fields" } },
				400
			);
		}

		// Parse and validate cart items
		let cartItems: CartItem[];
		try {
			cartItems = JSON.parse(cartItemString);
			if (!Array.isArray(cartItems)) {
				throw new Error("Invalid cart items format");
			}
		} catch (error) {
			return handlerNativeResponse(
				{ status: 400, errors: { message: "Invalid cart items format" } },
				400
			);
		}

		// Validate numeric values
		const subtotal = validateNumericValue(Number(total), "total");
		const totalAmount = validateNumericValue(Number(payable), "payable");
		const shippingFee = shipping
			? validateNumericValue(Number(shipping), "shippingFee")
			: 0;

		// Validate user session and permissions
		const session = await getCurrentUser();
		if (!session) {
			return handlerNativeResponse(
				{ status: 401, errors: { message: "Unauthorized user" } },
				401
			);
		}

		// Check user authorization
		const [user, customer] = await Promise.all([
			db.user.findFirst({ where: { email: session.email } }),
			db.customer.findFirst({ where: { id: customerId } }),
		]);

		if (!user || (user.role !== "ADMIN" && user.role !== "MANAGER")) {
			return handlerNativeResponse(
				{ status: 403, errors: { message: "Not authorized" } },
				403
			);
		}

		if (!customer) {
			return handlerNativeResponse(
				{ status: 404, errors: { message: "Customer not found" } },
				404
			);
		}

		// Prepare order items with validation
		const allCartItems: OrderItemType[] = cartItems.map((orderItem) => {
			const price =
				orderItem.item.productType === ProductType.PART
					? validateNumericValue(Number(orderItem.item.price), "product price")
					: validateNumericValue(orderItem.productPrice || 0, "product price");

			return {
				quantity: orderItem.quantity,
				price,
				name: String(orderItem.item.title),
				productId: orderItem.item.id,
			};
		});

		// Generate order details
		const referenceCode = generateRandomString(10);
		const orderNumber = await generateUniqueOrderNumberCode();

		// Create the order in a transaction
		const result = await db.$transaction(async (prisma) => {
			// Create the order
			const newOrder = await prisma.order.create({
				data: {
					orderNumber,
					status: OrderStatus.COMPLETED,
					subtotal,
					totalAmount,
					customer: { connect: { id: customer.id } },
					createdBy: { connect: { id: session.id } },
					orderItems: {
						create: allCartItems.map((orderItem) => ({
							unitPrice: orderItem.price,
							quantity: orderItem.quantity,
							discount: 0, // Set default discount to avoid null
							totalPrice: orderItem.price * orderItem.quantity,
							product: { connect: { id: orderItem.productId } },
						})),
					},
					payments: {
						create: {
							reference: referenceCode,
							status: PaymentStatus.PENDING,
							amount: totalAmount,
							method: PaymentMethod.TRANSFER,
						},
					},
				},
				include: {
					orderItems: true,
				},
			});

			// Process inventory updates
			await Promise.all(
				allCartItems.map(async (orderItem) => {
					await prisma.inventoryLog.create({
						data: {
							product: { connect: { id: orderItem.productId } },
							quantity: -orderItem.quantity,
							type: InventoryLogType.PURCHASE,
							reference: newOrder.orderNumber,
							createdBy: { connect: { id: user.id } },
						},
					});

					await prisma.product.update({
						where: { id: orderItem.productId },
						data: { currentStock: { decrement: orderItem.quantity } },
					});
				})
			);

			return newOrder;
		});

		return handlerNativeResponse(result, 200);
	} catch (error: any) {
		logger.error("ORDER CREATION ERROR", error);
		console.log(error);
		const errorMessage = error.message.includes("exceeds allowed limits")
			? "One or more values exceed maximum allowed limits"
			: "Something went wrong while processing your order";

		return handlerNativeResponse({ status: 500, message: errorMessage }, 500);
	}
}
