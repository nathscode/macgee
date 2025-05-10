import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

interface QuoteTempProps {
	name?: string;
	email?: string;
	message?: string;
	productDetails: string;
}

export default function QuoteTemp({
	name = "",
	email = ``,
	message = ``,
	productDetails = "",
}: QuoteTempProps) {
	const previewText = `Verify your email.`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="my-auto mx-auto w-full max-w-lg">
					<Container className="border border-solid border-neutral-500/25 rounded mx-auto p-6">
						<Hr className="my-5 border border-[#eaeaea] w-full" />
						<Heading className="mt-0">New Quote</Heading>
						<Text className="text-lg">Name: {name}</Text>
						<Text className="text-lg">Email: {email}</Text>
						<Text className="text-lg">product Details: {productDetails}</Text>
						<Text>{message}</Text>
						<Hr className="border border-solid border-neutral-500/25 my-4 mx-0 w-full" />
						<Text className="text-xs text-center mx-auto text-neutral-500/75">
							© {new Date().getFullYear()} Macgeeequipment™. All Rights
							Reserved.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
