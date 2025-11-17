import type { ComponentProps } from "react";

export const Section = ({
	label,
	children,
	...props
}: ComponentProps<"div"> & { label: string }) => {
	return (
		<div className="space-y-2" {...props}>
			<h3>{label}</h3>
			{children}
		</div>
	);
};
