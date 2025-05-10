import { Heading } from "@/components/Heading";
import BackButton from "@/components/common/back-button";
import { Separator } from "@/components/ui/separator";
import PosProductCart from "../../components/PosProductCart";
import AddCustomerModal from "@/components/modals/AddCustomerModal";
import { getAllCustomers } from "@/actions/getAllCustomers";
import CustomerSelectForm from "@/components/forms/customer-select-form";

type Props = {};

const CheckoutPage = async (props: Props) => {
	const customers = await getAllCustomers();

	return (
		<div className="px-10 py-5">
			<div className="flex items-center justify-between">
				<Heading
					title={`CHECKOUT`}
					description="Manage Point of sale for your store"
				/>
				<BackButton />
			</div>
			<Separator className="bg-gray-200 my-4" />
			<div className="flex flex-col mt-5 w-full border">
				<div className="flex flex-wrap justify-between w-full">
					<div className="w-full md:w-1/2  md:pr-5 mb-5 md:mb-0">
						<div className="flex flex-col w-full bg-slate-50 rounded-lg shadow-sm p-5">
							<PosProductCart />
						</div>
					</div>
					<div className="w-full md:w-1/2  md:pr-5 mb-5 md:mb-0">
						<div className="flex justify-between w-full my-4">
							<div className="justify-start">
								<h2 className="text-xl font-bold">
									Select customer {`(${customers?.length})`}
								</h2>
							</div>
							<div className="justify-start">
								<AddCustomerModal />
							</div>
						</div>
						<div className="flex flex-col w-full">
							<CustomerSelectForm customers={customers!} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
