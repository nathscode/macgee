import {
	Customer,
	InventoryLog,
	Media,
	Order,
	OrderItem,
	Product,
	Quote,
	User,
} from "@prisma/client";
import type { Timestamp, FirestoreDataConverter } from "firebase/firestore";
import { ISODateString } from "next-auth";

export type CustomUser = {
	id?: string;
	name?: string | null;
	username?: string | null;
	email?: string | null;
	phone?: string | null;
	role?: string | null;
	avatar?: string | null;
};

export type MediaExtras = Media;

export type SafeMedias = Omit<Media, "createdAt"> & {
	createdAt: string;
};
export type SafeCustomer = Omit<Customer, "createdAt"> & {
	createdAt: string;
};
export type CustomSession = {
	user?: CustomUser;
	expires: ISODateString;
};

export type OrderItemType = {
	quantity: number;
	price: number;
	name: string;
	note?: string;
	productId: string;
};

type EnhancedOmit<TRecordOrUnion, KeyUnion> =
	string extends keyof TRecordOrUnion
		? TRecordOrUnion
		: TRecordOrUnion extends any
			? Pick<TRecordOrUnion, Exclude<keyof TRecordOrUnion, KeyUnion>>
			: never;

export function exclude<User, Key extends keyof User>(
	user: User,
	keys: Key[]
): EnhancedOmit<User, Key> {
	return Object.fromEntries(
		Object.entries(user as { [k: string]: unknown }).filter(
			([key]) => !keys.includes(key as Key)
		)
	) as EnhancedOmit<User, Key>;
}

export interface ColumnProduct {
	id: string;
	name: string;
	category: string;
}

export type SafeProduct = Omit<Product, "createdAt"> & {
	createdAt: string;
	updatedAt: string;
};
export type SafeOrder = Omit<Order, "createdAt"> & {
	createdAt: string;
	updatedAt: string;
};
export type SafeInventory = Omit<InventoryLog, "createdAt"> & {
	createdAt: string;
};
export type SafeQuote = Omit<Quote, "createdAt"> & {
	createdAt: string;
};

export type InventoryLogWithExtras = SafeInventory & {
	user: User | null;
	product: Product | null;
};
export type OrderWithExtras = SafeOrder & {
	user: User | null;
	orderItem: OrderItem[];
	customer: Customer | null;
};

export type ProductWithExtras = SafeProduct & {
	user: User | null;
	medias: Media[];
};
export type QuoteWithExtras = SafeQuote & {
	product: SafeProduct | null;
};

export type ProductWithOutUser = SafeProduct & {
	medias: Media[];
};
export type CartProduct = SafeProduct & {
	medias: Media[];
};
export interface ApiResponse {
	success: boolean;
	payload?: any;
	error?: {
		message: string;
		code?: string;
	};
}

export interface ActionResponse<T = any> {
	message?: string;
	status: "success" | "error";
	data?: T;
}

// export const productConverter: FirestoreDataConverter<Product> = {
// 	toFirestore(product) {
// 		return { ...product };
// 	},
// 	fromFirestore(snapshot, options) {
// 		const { id } = snapshot;
// 		const data = snapshot.data(options);

// 		return { id, ...data } as Product;
// 	},
// };
