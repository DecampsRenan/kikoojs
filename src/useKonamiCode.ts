import { useEffect, useRef } from "react";

export type UseKonamiCodeOptions = {
	onSuccess: () => void;
	customCodeSequence?: Array<string>;
};

const konamiCode = [
	"ArrowUp",
	"ArrowUp",
	"ArrowDown",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"ArrowLeft",
	"ArrowRight",
	"b",
	"a",
];

export const useKonamiCode = (params: UseKonamiCodeOptions) => {
	const { onSuccess, customCodeSequence = konamiCode } = params;

	const nextCharCodeIndexRef = useRef<number>(0);

	useEffect(() => {
		const abortController = new AbortController();
		document.addEventListener(
			"keydown",
			(event) => {
				const nextValidCharCode =
					customCodeSequence[nextCharCodeIndexRef.current] ?? null;

				// If the next character to type is correct, increment the cursor
				// else, reset to 0.
				if (event.key === nextValidCharCode) {
					nextCharCodeIndexRef.current += 1;
				} else {
					nextCharCodeIndexRef.current = 0;
				}

				// If the index match the code length, it means the typed code was correct.
				// trigger onSuccess, reset counter.
				if (nextCharCodeIndexRef.current === customCodeSequence.length) {
					onSuccess();
					nextCharCodeIndexRef.current = 0;
				}
			},
			{
				signal: abortController.signal,
			},
		);

		return () => abortController.abort();
	}, [customCodeSequence, onSuccess]);
};
