import {
	useCallback,
	useEffect,
	useEffectEvent,
	useRef,
	useState,
} from "react";

export type UseDvdParams = {
	/**
	 * speed in px/ms
	 */
	xSpeed?: number;
	ySpeed?: number;
};

/**
 * Play the screensaver dvd logo bouncing on screen corners
 *
 * @example
 * const controls = useDvd(elementRef);
 *
 * controls.play()
 * controls.pause()
 * controls.stop()
 * controls.reset()
 */
export const useDvd = <ElementRef extends HTMLElement = HTMLElement>(
	params?: UseDvdParams,
) => {
	const elementRef = useRef<ElementRef>(null);
	const [status, setStatus] = useState<"stop" | "play">("stop");

	const { xSpeed = 100, ySpeed = 100 } = params ?? {};

	const animationFrameId = useRef<number>(-1);
	const windowSize = useRef({
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
	});

	const getXYPosition = useCallback(() => {
		if (!elementRef.current) return { x: 0, y: 0, width: 0, height: 0 };
		const boundingRect = elementRef.current.getBoundingClientRect();
		const obj = {
			x: boundingRect.left - window.pageXOffset,
			y: boundingRect.top - window.pageYOffset,
			width: boundingRect.width,
			height: boundingRect.height,
		};

		return obj;
	}, []);

	const initialElementPosition = useRef(getXYPosition());
	const currentPosition = useRef(initialElementPosition.current);
	const currentVelocity = useRef({ vx: xSpeed, vy: ySpeed });

	// Update window size if the browser window is resized
	useEffect(() => {
		const abortController = new AbortController();
		window.addEventListener(
			"resize",
			() => {
				windowSize.current = {
					width: document.documentElement.clientWidth,
					height: document.documentElement.clientHeight,
				};
			},
			{
				signal: abortController.signal,
			},
		);

		return () => abortController.abort();
	}, []);

	const lastTime = useRef(0);

	const runAnimation = useEffectEvent((timestamp: number) => {
		if (lastTime.current === 0) lastTime.current = timestamp;
		const deltaTime = (timestamp - lastTime.current) / 1000;
		lastTime.current = timestamp;

		if (!elementRef.current) return;

		// Update the element
		const elementPos = currentPosition.current;
		const viewport = windowSize.current;
		const velocity = currentVelocity.current;

		elementPos.x += velocity.vx * deltaTime;
		elementPos.y += velocity.vy * deltaTime;

		const screenX = initialElementPosition.current.x + elementPos.x;
		const screenY = initialElementPosition.current.y + elementPos.y;

		// Checks boundaries
		if (screenX + elementPos.width > viewport.width) {
			velocity.vx = -velocity.vx;
			elementPos.x =
				viewport.width - elementPos.width - initialElementPosition.current.x;
		}

		if (screenX < 0) {
			velocity.vx = -velocity.vx;
			elementPos.x = -initialElementPosition.current.x;
		}

		if (screenY + elementPos.height > viewport.height) {
			velocity.vy = -velocity.vy;
			elementPos.y =
				viewport.height - initialElementPosition.current.y - elementPos.height;
		}

		if (screenY < 0) {
			velocity.vy = -velocity.vy;
			elementPos.y = -initialElementPosition.current.y;
		}

		elementRef.current.style.translate = `${elementPos.x}px ${elementPos.y}px`;
		animationFrameId.current = requestAnimationFrame(runAnimation);
	});

	const startAnimation = useCallback(() => {
		if (!elementRef.current) return;

		// Setup default style used for animation
		elementRef.current.style.position = "fixed";
		elementRef.current.style.margin = "0";
		elementRef.current.style.padding = "0";
		elementRef.current.style.zIndex = "9999";

		initialElementPosition.current = getXYPosition();
		currentPosition.current = {
			...initialElementPosition.current,
			x: 0,
			y: 0,
		};

		animationFrameId.current = requestAnimationFrame(runAnimation);
	}, [getXYPosition]);

	return [
		elementRef,
		{
			start: () => {
				setStatus("play");
				startAnimation();
			},
			stop: () => {
				setStatus("stop");
				cancelAnimationFrame(animationFrameId.current);
			},
			isPlaying: status === "play",
		},
	] as const;
};
