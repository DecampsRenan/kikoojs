import type { ComponentProps } from "react";
import { highlighter } from "../lib/highlighter";

export const Code = ({
	children,
	className,
	lang = "tsx",
	...props
}: Omit<ComponentProps<"div">, "children"> & {
	children: string;
	lang?: "tsx" | "sh";
}) => {
	return (
		<div
			className={`${className ?? ""}`}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Needed to do syntax highlight
			dangerouslySetInnerHTML={{
				__html: highlighter.codeToHtml(children, {
					lang,
					theme: "catppuccin-latte",
					transformers: [
						{
							pre(node) {
								this.addClassToHast(
									node,
									"px-3 py-1 bg-gray-100 w-full overflow-x-auto rounded shadow-inner",
								);
							},
						},
					],
				}),
			}}
			{...props}
		/>
	);
};
