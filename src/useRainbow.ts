import { useRef } from "react";
import { useAnimationFrame } from "./useAnimationFrame";

export type UseRainbowParams<TargetElement extends HTMLElement = HTMLElement> =
	{
		enabled?: boolean;
		element?: TargetElement;
		speed?: number;
	};

export const useRainbow = <ElementRef extends HTMLElement = HTMLElement>(
	params?: UseRainbowParams<ElementRef>,
) => {
	const { enabled = true, element, speed = 0.1 } = params ?? {};
	const elementRef = useRef<ElementRef>(null);
	const colorValue = useRef<number>(0);

	const currentElement = elementRef.current ?? element ?? document.body;

	useAnimationFrame(
		(dt) => {
			colorValue.current += dt * speed;
			if (colorValue.current >= 360) colorValue.current = 0;
			currentElement.style.backgroundColor = `hsl(${colorValue.current}deg 100% 90%)`;
		},
		{ enabled },
	);

	return [elementRef];
};
