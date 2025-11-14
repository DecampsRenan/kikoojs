import { useState } from "react";
import { version } from "../../package.json";
import {
	useCursors,
	useDvd,
	useElevator,
	useGlitch,
	useKonamiCode,
	useRainbow,
} from "../../src";

export function App() {
	const [hasTouchedCorner, setHasTouchedCorner] = useState(false);
	const [titleRef] = useGlitch<HTMLHeadingElement>({ playMode: "hover" });

	const [triggerEltRef] = useElevator<HTMLButtonElement>({
		mainAudio: "/sfx/waiting.mp3",
		endAudio: "/sfx/ding.mp3",
	});

	useCursors({
		enabledCursors: ["fairyDustCursor", "trailingCursor", "emojiCursor"],
		containerElement: document.body,
	});

	const [fullTitleRef, dvdControls] = useDvd<HTMLDivElement>({
		xSpeed: 500,
		ySpeed: 500,
		onCorner: () => {
			// trigger confettis and shake screen and animate page background
			setHasTouchedCorner(true);
		},
	});

	useRainbow<HTMLDivElement>({ enabled: hasTouchedCorner });

	useKonamiCode({
		onSuccess: () => setHasTouchedCorner(true),
	});

	return (
		<div className="space-y-10 flex flex-col max-w-150 mx-auto mb-8 px-8">
			<div className="flex flex-col items-center gap-8 h-screen pt-20">
				{/** biome-ignore lint/a11y/useSemanticElements: I want it to be a div */}
				<div
					className="flex flex-col gap-1 justify-center"
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
					<h1
						className={`text-4xl md:text-5xl lg:text-7xl font-extrabold ${dvdControls.isPlaying ? "" : "text-[#ff4894]"}`}
						ref={titleRef}
					>
						KikooJS
					</h1>
					<span
						className={`text-sm ${dvdControls.isPlaying ? "" : "text-gray-500"}`}
					>
						v{version}
					</span>
				</div>
				<div>
					<p>
						You never asked for it, now it’s real. All the fun libs in one
						package ✨
					</p>
				</div>

				<code className="bg-gray-100 rounded px-6 py-4 shadow-inner">
					npm install kikoojs
				</code>

				<div>
					<p>
						Try typing "hi", "no", "homer", "bravo" or "lol" (there is many
						more, all options not listed here)
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

				<div className="flex-1" />

				<div className="my-5">↓ Scroll down ↓</div>
			</div>

			<div className="h-1200" />

			<button
				ref={triggerEltRef}
				className="bottom-5 right-5 bg-amber-200 text-amber-800 px-6 pt-4 pb-2 rounded font-bold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all active:scale-95"
				type="button"
			>
				ElevatorJS
			</button>
		</div>
	);
}
