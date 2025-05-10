import fetchQuoteById from "@/actions/fetchQuoteById";
import NotFound from "@/app/not-found";
import BackButton from "@/components/common/back-button";
import { formatDateTime } from "@/lib/utils";
import { Metadata } from "next";

interface QuoteDetailPageProps {
	params: {
		id: string;
	};
}

export const metadata: Metadata = {
	title: "Quote Details",
};

const QuoteDetailPage = async ({ params }: QuoteDetailPageProps) => {
	const quote = await fetchQuoteById(params.id);

	if (!quote) {
		return <NotFound />;
	}

	return (
		<div className="flex flex-col w-full max-w-lg">
			<div className="flex justify-start items-center">
				<BackButton />
				<h1 className="text-2xl font-bold ml-5">Quote Details</h1>
			</div>
			<div className="flex flex-col bg-slate-100 rounded-md border p-2 gap-2">
				<div className="flex flex-col">
					<span className="text-sm text-gray-500">Reference Code: </span>{" "}
					<span>{quote.referenceCode}</span>
				</div>
				<div className="flex flex-col">
					<span className="text-sm text-gray-500">Sender:</span>{" "}
					<span>{quote.name}</span>
					<span className="mt-1">{quote.email}</span>
				</div>
				<div className="flex flex-col">
					<span className="text-sm text-gray-500">Message</span>{" "}
					<span>{quote.message}</span>
				</div>{" "}
				<div className="flex flex-col">
					<span className="text-sm text-gray-500">Sent on</span>{" "}
					<span> {formatDateTime(quote.createdAt!.toString())}</span>
				</div>{" "}
			</div>
		</div>
	);
};

export default QuoteDetailPage;
