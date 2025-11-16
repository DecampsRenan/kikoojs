import type { ComponentProps } from "react";

export const Title = ({
	onClick,
	...props
}: Omit<ComponentProps<"div">, "onClick"> & { onClick?: () => void }) => {
	return (
		/** biome-ignore lint/a11y/useSemanticElements: I want it to be a div */
		<div
			tabIndex={0}
			role="button"
			{...props}
			onClick={() => onClick?.()}
			onKeyDown={(event) => {
				if (!["Enter", " "].includes(event.key)) return;
				props?.onKeyDown?.(event);
				onClick?.();
			}}
		/>
	);
};
