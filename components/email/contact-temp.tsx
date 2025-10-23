import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Tailwind,
	Text,
} from "@react-email/components";

interface ContactTempProps {
	fullname?: string;
	email?: string;
	message?: string;
}

export default function ContactTemp({
	fullname = "",
	email = ``,
	message = ``,
}: ContactTempProps) {
	const previewText = `Contact from ${fullname} (${email})`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="my-auto mx-auto w-full max-w-lg">
					<Container className="border border-solid border-neutral-500/25 rounded mx-auto p-6">
						<Hr className="my-5 border border-[#eaeaea] w-full" />
						<Heading className="mt-0">Contact</Heading>
						<Text className="text-lg">Name: {fullname}</Text>
						<Text className="text-lg">Email: {email}</Text>
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
