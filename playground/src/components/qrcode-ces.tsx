import type { ComponentProps, Ref } from "react";
import { Arrow9, Arrow37 } from "./arrow";

export const QRcode = ({
	ref,
	...props
}: Omit<ComponentProps<"div">, "ref"> & { ref: Ref<HTMLImageElement> }) => {
	return (
		<div
			className="relative flex flex-col items-center mt-20 sm:mt-0"
			{...props}
		>
			<Arrow37 className="absolute text-(--title-color) scale-40 rotate-70 -left-28 sm:-left-40 sm:bottom-30 sm:rotate-50" />
			<Arrow9 className="absolute text-(--title-color) -scale-70 -right-20 -bottom-20 rotate-50 sm:-right-20 sm:-scale-x-100 sm:-bottom-30 sm:rotate-50" />
			<img
				ref={ref}
				className="w-30 sm:w-70 mb-2"
				src="/img/qr-code.png"
				alt="Codeur en seine game qrcode"
			/>
			<small className="text-(--title-color)">Fork It! Tickets Hunt</small>
		</div>
	);
};
