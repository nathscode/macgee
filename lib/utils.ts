import { Prisma } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import Compressor from "compressorjs";
import Pica from "pica";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function stringifyObj(data: Object) {
	if (typeof data !== "object") return data;
	return JSON.parse(JSON.stringify(data));
}

export function getInitials(name: string): string {
	let words = name.split(" ");
	let firstChars = words.map((word) => word.substring(0, 1));
	let result = firstChars.join("");

	return result;
}

export function getFirstName(name: string): string {
	const nameParts = name.split(" ");
	return nameParts[0];
}

export function generateRandomString(length: number): string {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export function formatPrice(
	price: Prisma.Decimal | string,
	country?: string,
	options: {
		currency?: "NGN" | "USD" | "EUR" | "GBP" | "BDT";
		notation?: Intl.NumberFormatOptions["notation"];
	} = {}
) {
	const newCountry = country ? country : "en-NG";
	const { currency = "NGN", notation = "standard" } = options;
	const numericPrice =
		typeof price === "string" ? parseFloat(price) : Number(price);
	return new Intl.NumberFormat(newCountry, {
		style: "currency",
		currency,
		notation,
		maximumFractionDigits: 2,
	}).format(numericPrice);
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-NG");

export function formatNumber(number: number) {
	return NUMBER_FORMATTER.format(number);
}

export function formatDate(date: string): string {
	return moment.utc(date).format("DD MMM, YYYY");
}
export function formatDateSlash(date: string): string {
	return moment.utc(date).format("DD/MMM/YYYY");
}

export function formatDateTime(date: string): string {
	return moment.utc(date).format("DD MMM, YYYY, HH:mm A");
}
export function formatTime(date: string): string {
	return moment.utc(date).format("HH:mm A");
}

export const roundNumber = (num: number) =>
	Math.round((num + Number.EPSILON) * 100) / 100;

export function convertSecondsToTime(seconds: number): string {
	const days = Math.floor(seconds / (3600 * 24));
	const hours = Math.floor((seconds % (3600 * 24)) / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	let timeString = "";

	if (days > 0) {
		timeString += `${days}:`;
	}
	if (hours > 0) {
		timeString += `${hours}:`;
	}
	if (minutes > 0) {
		timeString += `${minutes}:`;
	}
	if (remainingSeconds > 0) {
		timeString += `${remainingSeconds}`;
	}

	return timeString.trim();
}

const DATE_FORMATTER = new Intl.DateTimeFormat("en", {
	dateStyle: "medium",
});

export function formatterDate(date: Date) {
	return DATE_FORMATTER.format(date);
}

export const compressImage = async (file: File): Promise<File> => {
	return new Promise((resolve, reject) => {
		new Compressor(file, {
			quality: 0.6,
			success(compressedBlob) {
				const compressedFile = new File([compressedBlob], file.name, {
					type: file.type,
				});
				resolve(compressedFile);
			},
			error(error) {
				reject(error);
			},
		});
	});
};

export const upscaleImageBrowser = async (file: File): Promise<File> => {
	return new Promise((resolve) => {
		const img = new Image();
		const url = URL.createObjectURL(file);
		const pica = new Pica();

		img.onload = async () => {
			// Create target canvas
			const targetCanvas = document.createElement("canvas");
			targetCanvas.width = 2000;
			targetCanvas.height = 2000;

			try {
				// Resize using Pica with valid options
				const resultCanvas = await pica.resize(img, targetCanvas, {
					quality: 3, // High quality (1-3)
					unsharpAmount: 80, // Sharpen the image
					unsharpRadius: 0.6,
					unsharpThreshold: 2,
				});

				// Convert back to File
				resultCanvas.toBlob(
					(blob) => {
						if (blob) {
							const upscaledFile = new File([blob], file.name, {
								type: "image/jpeg",
								lastModified: Date.now(),
							});
							resolve(upscaledFile);
						} else {
							resolve(file); // Fallback to original
						}
						URL.revokeObjectURL(url);
					},
					"image/jpeg",
					0.9
				);
			} catch (error) {
				console.error("Pica resize error:", error);
				resolve(file); // Fallback to original
				URL.revokeObjectURL(url);
			}
		};

		img.src = url;
	});
};
