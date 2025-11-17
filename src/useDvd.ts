import {
	useCallback,
	useEffect,
	useEffectEvent,
	useRef,
	useState,
} from "react";

export type UseDvdParams = {
	/**
	 * speed on x axis in px/ms
	 */
	xSpeed?: number;

	/**
	 * speed on y axis in px/ms
	 */
	ySpeed?: number;

	/**
	 * used to compute the color change speed
	 */
	variationSpeed?: number;

	/**
	 * Boolean used to indicate if the color should be animated
	 */
	animateColor?: boolean;

	/**
	 * called when the animated element touch a corner
	 */
	onCorner?: () => void;
};

/**
 * Play the screensaver dvd logo bouncing on screen corners
 *
 * @example
 * const controls = useDvd(elementRef);
 *
 * controls.play()
 * controls.stop()
 */
export const useDvd = <ElementRef extends HTMLElement = HTMLElement>(
	params?: UseDvdParams,
) => {
	const elementRef = useRef<ElementRef>(null);
	const [status, setStatus] = useState<"stop" | "play">("stop");

	const {
		xSpeed = 300,
		ySpeed = 300,
		variationSpeed = 200,
		animateColor = false,
		onCorner,
	} = params ?? {};

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
	const currentColor = useRef(0);

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
		let hasTouchedX = false;
		let hasTouchedY = false;

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

		if (animateColor) {
			currentColor.current += variationSpeed * deltaTime;
		}

		const screenX = initialElementPosition.current.x + elementPos.x;
		const screenY = initialElementPosition.current.y + elementPos.y;

		if (currentColor.current > 360) {
			currentColor.current = 0;
		}

		// Checks boundaries
		if (screenX + elementPos.width > viewport.width) {
			hasTouchedX = true;
			velocity.vx = -velocity.vx;
			elementPos.x =
				viewport.width - elementPos.width - initialElementPosition.current.x;
		}

		if (screenX < 0) {
			hasTouchedX = true;
			velocity.vx = -velocity.vx;
			elementPos.x = -initialElementPosition.current.x;
		}

		if (screenY + elementPos.height > viewport.height) {
			hasTouchedY = true;
			velocity.vy = -velocity.vy;
			elementPos.y =
				viewport.height - initialElementPosition.current.y - elementPos.height;
		}

		if (screenY < 0) {
			hasTouchedY = true;
			velocity.vy = -velocity.vy;
			elementPos.y = -initialElementPosition.current.y;
		}

		elementRef.current.style.translate = `${elementPos.x}px ${elementPos.y}px`;

		if (animateColor) {
			elementRef.current.style.color = `hsl(${currentColor.current}deg 100% 50%)`;
		}

		if (hasTouchedX && hasTouchedY) {
			onCorner?.();
		}

		animationFrameId.current = requestAnimationFrame(runAnimation);
	});

	const startAnimation = useCallback(() => {
		if (!elementRef.current) return;

		// Setup default style used for animation
		elementRef.current.style.position = "fixed";
		elementRef.current.style.margin = "0";
		elementRef.current.style.padding = "0";
		elementRef.current.style.zIndex = "9999";
		if (animateColor) {
			elementRef.current.style.color = "hsl(0 100% 50%)";
		}

		initialElementPosition.current = getXYPosition();
		currentPosition.current = {
			...initialElementPosition.current,
			x: 0,
			y: 0,
		};

		animationFrameId.current = requestAnimationFrame(runAnimation);
	}, [getXYPosition, animateColor]);

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
