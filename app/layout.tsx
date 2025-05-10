import { Poppins } from "next/font/google";
import ProviderWrapper from "../components/layout/provider";

import "@/styles/globals.css";
import "@/styles/main.css";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

const font = Poppins({
	weight: ["400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://macgeeequipment.com/"),
	title: {
		template: "%s | MACGEEE",
		default: "MACGEEE - buy new or used machinery and parts",
	},
	description: "buy new or used machinery and parts",
	other: {
		"theme-color": "#FF0026",
		"color-scheme": "light",
		"twitter:image": "/assets/images/logo/macgee.jpeg",
		"twitter:card": "summary_large_image",
		"og:url": "httpS://macgeeequipment.com/",
		"og:image": "/assets/images/logo/macgee.jpeg",
		"og:type": "website",
	},
	openGraph: {
		title: "MACGEEE - Home of Machinery",
		description: "buy new or used machinery and parts",
		url: "https://macgeeequipment.com/",
		siteName: "MACGEEE",
		images: [
			{
				url: "/assets/images/logo/macgee.jpeg",
				width: 1200,
				height: 600,
			},
		],
	},
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<Providers>
					<div className="relative">{children}</div>
					<Toaster />
				</Providers>
				{/* <ProviderWrapper>{children}</ProviderWrapper> */}
			</body>
		</html>
	);
}
