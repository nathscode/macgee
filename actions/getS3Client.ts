import { S3Client } from "@aws-sdk/client-s3";
export const s3 = new S3Client({
	endpoint: process.env.TEBI_ENDPOINT,
	region: "global",
	credentials: {
		accessKeyId: process.env.TEBI_ACCESS_KEY!,
		secretAccessKey: process.env.TEBI_SECRET_KEY!,
	},
});

// THE OLD PROVIDER (For existing images)
export const tebiS3 = new S3Client({
	endpoint: process.env.TEBI_ENDPOINT,
	region: "global",
	credentials: {
		accessKeyId: process.env.TEBI_ACCESS_KEY!,
		secretAccessKey: process.env.TEBI_SECRET_KEY!,
	},
});

// THE NEW PROVIDER (For all new uploads)
export const newS3 = new S3Client({
	endpoint: process.env.S3_ENDPOINT,
	region: process.env.S3_REGION || "de-zlg1",
	forcePathStyle: true,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY!,
		secretAccessKey: process.env.S3_SECRET_KEY!,
	},
});
