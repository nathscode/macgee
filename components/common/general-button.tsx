"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
	children: React.ReactNode;
	className?: string;
	link: string;
};
const GeneralButton = ({ children, className, link }: Props) => {
	const router = useRouter();

	return (
		<Button
			variant="brand"
			className={`${className}`}
			onClick={() => router.push(`${link}`)}
		>
			{children}
		</Button>
	);
};

export default GeneralButton;
