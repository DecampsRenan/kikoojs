import type { ComponentProps, Ref } from "react";
import { Arrow9, Arrow37 } from "./arrow";

export const QRcode = ({
	ref,
	...props
}: Omit<ComponentProps<"div">, "ref"> & { ref: Ref<HTMLImageElement> }) => {
	return (
		<div className="relative flex flex-col items-center" {...props}>
			<Arrow37 className="absolute text-(--title-color) -left-40 bottom-30 rotate-50" />
			<Arrow9 className="absolute text-(--title-color) -right-20 -scale-x-100 -bottom-30 rotate-50" />
			<img
				ref={ref}
				className="w-70 mb-2"
				src="/img/qr-code.png"
				alt="Codeur en seine game qrcode"
			/>
			<small className="text-(--title-color)">Codeur en Seine game</small>
		</div>
	);
};
