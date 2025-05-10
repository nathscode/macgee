import { Heading } from "@/components/Heading";
import BackButton from "@/components/common/back-button";
import { Separator } from "@/components/ui/separator";
import PosProductCart from "../../../components/PosProductCart";
import CheckoutCustomer from "../../../components/CheckoutCustomer";

type Props = {};

const CheckoutConfirmPage = async (props: Props) => {
	return (
		<div className="px-10 py-5">
			<div className="flex items-center justify-between">
				<Heading
					title={`CONFIRM CHECKOUT`}
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
						<div className="flex flex-col w-full">
							<CheckoutCustomer />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutConfirmPage;
