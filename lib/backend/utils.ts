import crypto from "crypto";
export function handlerNativeResponse(data: any, status: number) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}
export function checkFileType(variable: any): "file" | "string" | "other" {
	if (
		typeof variable === "object" &&
		variable !== null &&
		"size" in variable &&
		"type" in variable &&
		"name" in variable &&
		"lastModified" in variable
	) {
		return "file";
	} else if (typeof variable === "string") {
		return "string";
	} else {
		return "other";
	}
}

export function generateRandomString(): string {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	const length = 5;

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}

	return result;
}

export function getRandomNumber(min: number, max: number): string {
	return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

export function generateRandomNumbers(count: number): string {
	let numbers: string[] = [];
	for (let i = 0; i < count; i++) {
		let randomNumber = Math.floor(Math.random() * (9 - 0) + 0);
		numbers.push(randomNumber.toString());
	}
	return numbers.join("");
}

export function deepClone(obj: any) {
	if (obj === null || typeof obj !== "object") {
		return obj;
	}

	// Create a new object with the same prototype as the original object
	const clone = Object.create(Object.getPrototypeOf(obj));

	// Copy all enumerable properties from the original object to the clone
	for (const key of Object.keys(obj)) {
		clone[key] = deepClone(obj[key]);
	}

	return clone;
}

export function normalizeEmail(email: string): string {
	return email.trim().toLowerCase();
}

export function trimAndLowercase(inputString: string): string {
	return inputString.trim().toLowerCase();
}

export function generateCryptoString(length: number): string {
	const timestamp = Date.now().toString();
	const randomBytes = crypto.randomBytes(16).toString("hex");
	const combinedString = `${timestamp}-${randomBytes}`;
	return crypto
		.createHash("sha256")
		.update(combinedString)
		.digest("hex")
		.slice(0, length);
}

export function getCookies(): Record<string, string> {
	const cookies = document.cookie
		.split(";")
		.reduce<Record<string, string>>((acc, cookie) => {
			const [name, value] = cookie.trim().split("=");
			acc[name] = value;
			return acc;
		}, {});

	return cookies;
}
