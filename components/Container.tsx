import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="max-w-[1200px] mx-auto overflow-hidden px-5">
			{children}
		</div>
	);
};

export default Container;
