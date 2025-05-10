import React from "react";

type Props = {
	text: string;
	status: string;
};

const Badge = ({ text, status }: Props) => {
	return (
		<div
			className={` ${
				status === "SUCCESS" || status === "COMPLETED" || status === "DELIVERED"
					? "bg-green-100 text-green-800"
					: status === "CONFIRM" || status === "READY" || status === "PROGRESS"
					? "bg-orange-100 text-orange-800"
					: status === "CANCELLED" || status === "REFUNDED"
					? "bg-gray-100 text-gray-800"
					: status === "PENDING" || status === "PROCESSING"
					? "bg-orange-100 text-orange-800"
					: "bg-red-100 text-red-800"
			} text-[12px] px-3 py-1 font-medium rounded-full w-fit text-center`}
		>
			{text}
		</div>
	);
};

export default Badge;
