import {
	type GlitchableElement,
	type GlitchPartialOptions,
	type GlitchResult,
	PowerGlitch,
} from "powerglitch";
import { useEffect, useRef } from "react";

export type UseGlitchOptions = GlitchPartialOptions;

/**
 * React version of powerglitch lib (cf. https://github.com/7PH/powerglitch)
 * @param options powerglitch options
 */
// biome-ignore lint/suspicious/noExplicitAny: I need it here
export const useGlitch = <ElementRef extends GlitchableElement = any>(
	options?: UseGlitchOptions,
) => {
	const glitchEltRef = useRef<ElementRef>(null);
	const controls = useRef<GlitchResult>(null);

	useEffect(() => {
		if (!glitchEltRef.current) return;
		controls.current = PowerGlitch.glitch(glitchEltRef.current, {
			...options,
			timing: {
				easing: "ease-in-out",
				...options?.timing,
			},
		});

		return () => {
			controls.current?.stopGlitch();
		};
	}, [options]);

	return [glitchEltRef, controls.current] as const;
};
