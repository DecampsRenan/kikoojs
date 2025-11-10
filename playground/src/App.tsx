import { useElevator, useGlitch } from "../../src";

export function App() {
	const glitchRef = useGlitch<HTMLHeadingElement>();

	const { triggerEltRef } = useElevator<HTMLButtonElement>({
		mainAudio: "/sfx/waiting.mp3",
		endAudio: "/sfx/ding.mp3",
	});

	return (
		<div className="space-y-10 flex flex-col items-center mt-10">
			<div className="space-y-0 text-left">
				<h1 className="text-4xl" ref={glitchRef}>
					✨ Glitch element
				</h1>
				<small>
					Powered by{" "}
					<a
						className="underline underline-offset-2"
						href="https://github.com/7PH/powerglitch"
					>
						powerglitch
					</a>
				</small>
			</div>

			<div className="flex h-60 w-80 border border-gray-400 rounded-sm">
				<div className="m-auto">Custom cursors</div>
			</div>

			<div className="flex h-[5600px] w-80 border border-gray-400 rounded-sm">
				<div className="m-auto">Elevator</div>
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
