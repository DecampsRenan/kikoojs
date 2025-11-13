import { useEffect, useRef, useState } from "react";
import { useExternalScript } from "./useExternalScript";

export const elevatorJsSrc =
	"https://cdnjs.cloudflare.com/ajax/libs/elevator.js/1.0.1/elevator.min.js";

export type UseElevatorOptions<
	TriggerElement extends Element = Element,
	TargetElement extends Element = Element,
> = {
	/**
	 * Music played while the page is scrolling
	 */
	mainAudio?: string;

	/**
	 * Music played when the page has stopped scrolling
	 */
	endAudio?: string;

	/**
	 * Clicking this element will invoke the "Scroll to top" functionality
	 */
	element?: TriggerElement | undefined;

	/**
	 * If you don't want to scroll to the top, a custom target can be specified with this option
	 */
	targetElement?: TargetElement | undefined;

	/**
	 * Extra padding to add on the top in pixels
	 */
	verticalPadding?: number;

	/**
	 * Fixed scroll duration is milliseconds
	 */
	duration?: number;

	/**
	 * Called when the elevator starts moving
	 */
	startCallback?: () => void;

	/**
	 * Called when the elevator reached target level
	 */
	endCallback?: () => void;
};

export const useElevator = <
	TriggerElement extends Element = Element,
	TargetElement extends Element = Element,
>(
	options?: UseElevatorOptions<TriggerElement, TargetElement>,
) => {
	const { isReady } = useExternalScript(elevatorJsSrc);
	const [status, setStatus] = useState<"not-loaded" | "loading" | "ready">(
		"not-loaded",
	);

	const elevatorRef = useRef<Elevator>(null);
	const triggerEltRef = useRef<TriggerElement>(null);
	const optionsRef = useRef(options);

	useEffect(() => {
		setStatus("loading");
		if (!isReady) {
			return;
		}

		elevatorRef.current = new Elevator<TriggerElement, TargetElement>({
			element: triggerEltRef.current ?? undefined,
			...optionsRef.current,
		});

		setStatus("ready");
	}, [isReady]);

	return {
		isReady: status === "ready",
		isLoading: status === "loading",
		elevator: elevatorRef.current,
		triggerEltRef,
	};
};

declare global {
	class Elevator<
		TriggerElement extends Element = Element,
		TargetElement extends Element = Element,
	> {
		constructor(params?: UseElevatorOptions<TriggerElement, TargetElement>);
		elevate(): void;
	}
}
