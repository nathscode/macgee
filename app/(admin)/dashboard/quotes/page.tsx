import { getAllQuotes } from "@/actions/getAllQuotes";
import { Heading } from "@/components/Heading";
import { QuoteColumns } from "@/components/columns/quote-column";
import { DataTable } from "@/components/common/data-table";
import { Separator } from "@/components/ui/separator";

const QuotesAdminPage = async () => {
	const quotes = await getAllQuotes();
	return (
		<div className="px-10 py-5">
			<div className="flex items-center justify-between">
				<Heading
					title={`Quotes (${quotes?.length})`}
					description="Manage All Quotes"
				/>
			</div>
			<Separator className="bg-gray-200 my-4" />
			<DataTable
				columns={QuoteColumns}
				//@ts-ignore
				data={quotes}
				searchKey="referenceCode"
			/>
		</div>
	);
};

export default QuotesAdminPage;
