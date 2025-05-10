import React, { forwardRef } from "react";
import { cls } from "../../utils/helpers/cls";

const classes = {
	base: "focus:outline-none transition ease-in-out duration-300",
	disabled: "opacity-10 cursor-not-allowed",
	pill: "rounded-full",
	size: {
		small: "px-2 py-1 text-sm",
		normal: "px-4 py-2",
		large: "px-8 py-3 text-lg",
	},
	variant: {
		primary:
			"bg-brand hover:bg-brand/80 focus:ring-2 focus:ring-brand/50 focus:ring-opacity-50 text-white",
		secondary:
			"bg-gray-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900 hover:text-white",
		danger:
			"bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white",
	},
};

const Button = forwardRef(
	(
		{
			children,
			type = "button",
			className,
			variant = "primary",
			size = "normal",
			pill,
			disabled = false,
			onClick,
			...props
		},
		ref
	) => (
		<button
			ref={ref}
			disabled={disabled}
			onClick={onClick}
			type={type}
			className={cls(`
                ${classes.base}
                ${classes.size[size]}
                ${classes.variant[variant]}
                ${pill && classes.pill}
                ${disabled && classes.disabled}
                ${className}
            `)}
			{...props}
		>
			{children}
		</button>
	)
);

export default Button;
