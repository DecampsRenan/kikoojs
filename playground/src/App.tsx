import { useRef } from "react";
import { version } from "../../package.json";
import { useCursors, useDvd, useElevator, useGlitch } from "../../src";

export function App() {
	const cursorContainerEltRef = useRef<HTMLDivElement>(null);

	const [titleRef] = useGlitch<HTMLHeadingElement>({ playMode: "hover" });
	const [glitchRef] = useGlitch<HTMLHeadingElement>();

	const { triggerEltRef } = useElevator<HTMLButtonElement>({
		mainAudio: "/sfx/waiting.mp3",
		endAudio: "/sfx/ding.mp3",
	});

	useCursors({
		enabledCursors: [
			"fairyDustCursor",
			"followingDotCursor",
			"trailingCursor",
			"emojiCursor",
		],
		containerElement: cursorContainerEltRef.current,
	});

	const [fullTitleRef, dvdControls] = useDvd<HTMLDivElement>();

	return (
		<div className="space-y-10 flex flex-col mt-15 max-w-160 m-auto px-8">
			<div className="space-y-0">
				{/** biome-ignore lint/a11y/useSemanticElements: I want it to be a div */}
				<div
					className="flex"
					ref={fullTitleRef}
					tabIndex={0}
					role="button"
					onKeyDown={(event) => {
						if (!["Enter", " "].includes(event.key)) return;
						if (dvdControls.isPlaying) return;
						dvdControls.start();
					}}
					onClick={() => {
						if (dvdControls.isPlaying) return;
						dvdControls.start();
					}}
				>
					<h1 className="text-4xl font-extrabold" ref={titleRef}>
						KikooJS
					</h1>
					<span className="text-sm">v{version}</span>
				</div>
				<span>
					✨ You never asked for it — now it’s real. All the fun libs in one
					package ✨
				</span>
			</div>

			<div className="self-center font-mono bg-gray-700 rounded px-4 py-2 shadow-inner">
				&gt; npm install kikoojs
			</div>

			<div className="flex">
				<h2 className="text-2xl font-bold">What's inside ?</h2>
			</div>

			<div className="space-y-0 text-left">
				<h1 className="text-3xl" ref={glitchRef}>
					✨ Glitch element
				</h1>
				<span className="text-xs">
					Powered by{" "}
					<a
						className="underline underline-offset-2"
						href="https://github.com/7PH/powerglitch"
						target="_blank"
						rel="noopener"
					>
						powerglitch
					</a>
				</span>
			</div>
			<div className="space-y-0 text-left">
				<div
					ref={cursorContainerEltRef}
					className="flex relative h-60 border border-gray-400 rounded-sm"
				>
					<div className="m-auto">Custom cursors</div>
				</div>
				<span className="text-xs">
					Powered by{" "}
					<a
						className="underline underline-offset-2"
						href="https://github.com/tholman/cursor-effects"
						target="_blank"
						rel="noopener"
					>
						90's Cursor Effects
					</a>
				</span>
			</div>

			<div>
				<p>
					Try typing "hi", "no", "homer", "bravo" or "lol" (there is many more,
					all options not listed here)
				</p>
				<span className="text-xs">
					Powered by{" "}
					<a
						className="underline underline-offset-2"
						href="https://github.com/WeiChiaChang/easter-egg-collection"
						target="_blank"
						rel="noopener"
					>
						Easter Eggs Collection
					</a>
				</span>
			</div>

			<div className="space-y-0 text-left">
				<div className="flex h-[5600px] border border-gray-400 rounded-sm">
					<div className="m-auto">Elevator</div>
				</div>
				<span className="text-xs">
					Powered by{" "}
					<a
						className="underline underline-offset-2"
						href="https://github.com/tholman/elevator.js/tree/master"
						target="_blank"
						rel="noopener"
					>
						ElevatorJS
					</a>
				</span>
			</div>

			<button
				ref={triggerEltRef}
				className="fixed bottom-5 right-5 bg-amber-200 text-amber-800 px-4 py-2 rounded font-bold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all active:scale-95"
				type="button"
			>
				ElevatorJS
			</button>
		</div>
	);
}
