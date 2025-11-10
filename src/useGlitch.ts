import {
	type GlitchableElement,
	type GlitchPartialOptions,
	PowerGlitch,
} from "powerglitch";
import { useLayoutEffect, useRef } from "react";

export type UseGlitchOptions = GlitchPartialOptions;

/**
 * React version of powerglitch lib (cf. https://github.com/7PH/powerglitch)
 * @param options powerglitch options
 * @returns Ref you can link to the element you want to glitch
 */
export const useGlitch = <ElementRef extends GlitchableElement>(
	options?: UseGlitchOptions,
) => {
	const glitchEltRef = useRef<ElementRef>(null);

	useLayoutEffect(() => {
		if (!glitchEltRef.current) return;
		PowerGlitch.glitch(glitchEltRef.current, {
			timing: {
				easing: "ease-in-out",
			},
			...options,
		});
	}, [options]);

	return glitchEltRef;
};
