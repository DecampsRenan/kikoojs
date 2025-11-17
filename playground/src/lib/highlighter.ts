import { createHighlighter } from "shiki";

export const highlighter = await createHighlighter({
	themes: ["catppuccin-latte"],
	langs: ["tsx", "sh"],
});
