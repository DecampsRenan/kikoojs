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
import { Title } from "./components/Title";

// - désactiver l'ia
// - voir si le son fonctionne
// - voir pour vidéo minute kikoo

export function App() {
	const [hasTouchedCorner, screenSetHasTouchedCorner] = useState(false);
	const [titleRef] = useGlitch<HTMLDivElement>({
		playMode: "hover",
	});

	const [triggerElevatorRef] = useElevator<HTMLButtonElement>({
		mainAudio: "../sfx/wainting.mp3",
		endAudio: "../sfx/ding.mp3",
	});

	useCursors({
		enabledCursors: [
			"trailingCursor",
			"bubbleCursor",
			"emojiCursor",
			"characterCursor",
		],
	});

	const [dvdRef, { start }] = useDvd<HTMLDivElement>({
		xSpeed: 500,
		ySpeed: 500,
		onCorner: () => {
			screenSetHasTouchedCorner(true);
		},
	});

	useKonamiCode({
		onSuccess: () => {
			screenSetHasTouchedCorner(true);
		},
	});

	useRainbow({
		element: document.body,
		enabled: hasTouchedCorner,
	});

	return (
		<div className="space-y-10 flex flex-col max-w-150 mx-auto mb-8 px-8">
			<div className="flex flex-col items-center gap-8 h-screen pt-20">
				<Title
					ref={dvdRef}
					onClick={() => start()}
					className="flex flex-col gap-1 justify-center"
				>
					<h1
						ref={titleRef}
						className={`text-4xl md:text-5xl lg:text-7xl font-extrabold text-(--title-color)`}
					>
						KikooJS
					</h1>
					<span className={`text-sm`}>v{version}</span>
				</Title>
				<div>
					You never asked for it, now it’s real. All the fun libs in one package
					✨
				</div>

				<code className="bg-gray-100 rounded px-6 py-4 shadow-inner">
					npm install kikoojs
				</code>
			</div>

			<div className="h-1200" />

			<button ref={triggerElevatorRef} type="button">
				Go to top
			</button>
		</div>
	);
}
