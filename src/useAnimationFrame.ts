import { useCallback, useEffect, useRef } from "react";

export type UseAnimationFrameParams = {
	enabled?: boolean;
};

export const useAnimationFrame = (
	callback: (time: number) => void,
	params?: UseAnimationFrameParams,
) => {
	const { enabled = true } = params ?? {};

	// Use useRef for mutable variables that we want to persist
	// without triggering a re-render on their change
	const requestRef = useRef<number>(null);
	const previousTimeRef = useRef<number>(null);

	const animate = useCallback(
		(time: number) => {
			if (previousTimeRef.current !== null) {
				const deltaTime = time - previousTimeRef.current;
				callback(deltaTime);
			}
			previousTimeRef.current = time;
			requestRef.current = requestAnimationFrame(animate);
		},
		[callback],
	);

	useEffect(() => {
		if (enabled) requestRef.current = requestAnimationFrame(animate);
		return () => {
			if (requestRef.current) {
				cancelAnimationFrame(requestRef.current);
			}
		};
	}, [animate, enabled]); // Make sure the effect runs only once
};
