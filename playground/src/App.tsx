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
import { Code } from "./components/code";
import { DancingDuck } from "./components/dancing-duck";
import { QRcode } from "./components/qrcode-ces";
import { Section } from "./components/section";

export function App() {
	const [hasTouchedCorner, setHasTouchedCorner] = useState(false);
	const [showDancingDuck, setShowDancingDuck] = useState(false);

	const [titleRef] = useGlitch<HTMLHeadingElement>({ playMode: "hover" });

	const [triggerEltRef] = useElevator<HTMLButtonElement>({
		mainAudio: "/sfx/waiting.mp3",
		endAudio: "/sfx/ding.mp3",
		startCallback: () => setShowDancingDuck(true),
		endCallback: () => setShowDancingDuck(false),
	});

	useCursors({
		enabledCursors: ["fairyDustCursor", "trailingCursor", "emojiCursor"],
		containerElement: document.body,
	});

	const [fullTitleRef, dvdControls] = useDvd<HTMLDivElement>({
		animateColor: true,
		onCorner: () => {
			// trigger confettis and shake screen and animate page background
			setHasTouchedCorner(true);
		},
	});

	const [qrcodeRef, qrcodeControls] = useDvd<HTMLImageElement>({
		animateColor: true,
	});

	useRainbow<HTMLDivElement>({ enabled: hasTouchedCorner });

	useKonamiCode({
		onSuccess: () => setHasTouchedCorner(true),
	});

	return (
		<>
			<DancingDuck show={showDancingDuck} />
			<div className="space-y-10 flex flex-col max-w-150 lg:max-w-180 mx-auto mb-8 px-8">
				<div className="flex flex-col items-center gap-8 h-screen pt-10">
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
							className={`text-4xl md:text-5xl lg:text-7xl font-extrabold ${dvdControls.isPlaying ? "" : "text-(--title-color)"}`}
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

					<Code lang="sh">npm install kikoojs</Code>

					<div className="max-w-150 mt-5">
						<p>
							Try typing "hi", click the title, take the elevator! This lib has
							many <span className="line-through">useless</span> fun things to
							offer!
						</p>
					</div>

					<QRcode ref={qrcodeRef} onClick={() => qrcodeControls.start()} />

					<div className="flex-1" />

					<div className="my-5">↓ Scroll down ↓</div>
				</div>

				<div className="space-y-20">
					<h2>How to use all the fun the library has to offer?</h2>

					<Section label="Easter Egg Collection">
						<p>
							Just add{" "}
							<code>import 'kikoojs/easter-egg-collection-register';</code> at
							your script entrypoint.
						</p>
						<p>
							You can also manually instantiate it by calling the{" "}
							<code>register()</code> method.
						</p>
						<Code>
							{`import { register } from 'kikoojs/easter-egg-collection-register';

// Somewhere in your code
register();

// Now you can type "bravo", "lol", etc... and it just works™
`}
						</Code>
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
					</Section>

					<Section label="useCursor()">
						<p>
							<code>useCursor()</code> hook without parameter create a canvas on
							the body of your webpage. You can enable multiple cursors at the
							same time!
						</p>
						<p>I know some cursor are missing; I will add them later 😉</p>
						<Code>
							{`import { useCursor } from 'kikoojs';

const MyPage = () => {

  // Enable only one cursor on the body
  useCursor({ enabledCursors: 'rainbowCursor' });
  
  // Enable only one cursor and override the default config
  useCursor({ enabledCursors: { 
    name: 'rainbowCursor',
    config: {
      length: 3,
      size: 5,
    },
  } });

  // Enable multiple cursors on the body
  useCursor({ enabledCursors: ['rainbowCursor', 'textFlag'] }); 

  // You can also override default settings when using multiple cursors
  useCursor({ enabledCursors: [
    { 
      name: 'rainbowCursor',
      config: {
        length: 3,
        size: 5,
      },
    },
    {
      name: 'textFlag',
      config: {
        text: 'Give a star on the kikoojs repo';
      }
    }
  ] });

  return (
    <div>...</div>
  );
}`}
						</Code>
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
					</Section>

					<Section label="useDvd()">
						<p>Animate any html element like the good old dvd logo</p>

						<Code>
							{`import { useDvd } from 'kikoojs';

export const MyPage = () => {
  const [bouncingEltRef, { start }] = useDvd<HTMLButtonElement>();

  /*
    You can override the default speed:
    const [bouncingEltRef, { start, stop, isPlaying }] = useDvd<HTMLButtonElement>({
      xSpeed: 500,
      ySpeed: 250,
      variationSpeed: 100, // Speed of the color change if animateColor is true
      animateColor: true,  // If true, the color css property will be animated (nice on text elements 👌)
      onCorner: () => {
        // Do something if the logo perfectly touches the corners !
      },
    });
  */

  return (
    <button ref={bouncingEltRef} onClick={() => start()} type="button">This button will bounce if clicked</button>
  );
}`}
						</Code>
						<span className="text-xs">Homemade™</span>
					</Section>

					<Section label="useElevator()">
						<p>Add a simple and fun way to trigger a scroll to top!</p>

						<Code>
							{`import { useElevator } from 'kikoojs';

export const MyPage = () => {
  const [triggerGoToTopEltRef, { isLoading }] = useElevator<HTMLButtonElement>({
    mainAudio: '/path/to/audio.mp3',
    endAudio: '/path/to/audio.mp3',
  });

  /*
    You have access to the elevatorjs options and instance if wanted:
    const [triggerGoToTopEltRef, {
      isReady,   // Boolean indicating if the script is loaded and the button can be activated
      isLoading, // Boolean indicating if the script is still loading
      elevator   // ElevatorJS instance
    }] = useElevator<HTMLButtonElement>({
      // Full ElevatorJS options, go check elevatorjs doc 
    });
  */

  return (
    <div>
      {/* Huuuuuuuge height */}

      <button ref={triggerGoToTopEltRef} type="button" disabled={isLoading}>↑ Go to top ↑</button>
    </div>
  );
}`}
						</Code>
						<span className="text-xs">
							Powered by{" "}
							<a
								className="underline underline-offset-2"
								href="https://github.com/tholman/elevator.js"
								target="_blank"
								rel="noopener"
							>
								Elevator.js
							</a>
						</span>
					</Section>

					<Section label="useGlitch()">
						<p>
							Thanks to the awesome PowerGlitch lib, this hook can make any
							element glitch-able. It takes all options powerglitch supports!
						</p>
						<Code>
							{`import { useGlitch } from 'kikoojs';

export const MyPage = () => {
  const [glitchEltRef] = useGlitch<HTMLHeadingElement>();

  /*
  const [glitchEltRef] = useGlitch<HTMLHeadingElement>({
    // Here you can pass all options PowerGlitch supports ! Check the
    // PowerGlitch doc to have the full options list.
    playMode: 'hover', // Play glitch animation on element hover
  });
  */

  return (
    <h1 ref={glitchEltRef}>My Super Title</h1>
  );
}
`}
						</Code>
						<span className="text-xs">
							Powered by{" "}
							<a
								className="underline underline-offset-2"
								href="https://github.com/7ph/powerglitch"
								target="_blank"
								rel="noopener"
							>
								PowerGlitch
							</a>
						</span>
					</Section>

					<Section label="useKonamiCode()">
						<p>
							What is a website without easter eggs triggered from a konami
							code?
						</p>
						<Code>
							{`import { useKonamiCode } from 'kikoojs';

export const MyPage = () => {
  useKonamiCode({
    onSuccess: () => {
      // Callback called if the konami code succeed!
    }
  });

  // You can customize the code
  useKonamiCode({
    customCodeSequence: ['k', 'i', 'k', 'o', 'o', 'j', 's'],
    onSuccess: () => {
      // Callback called if 'kikoojs' is correctly typed!
    }
  });
}`}
						</Code>
						<span className="text-xs">Homemade™</span>
					</Section>

					<Section label="useRainbow()">
						<p>
							Delightfull background color animation on the html element you
							want!
						</p>
						<Code>
							{`import { useRainbow } from 'kikoojs';

export const MyPage = () => {
  useRainbow(); // Yes, simple as that! It will animated background-color change on body

  // Full list of options:
  const [eltRef] = useRainbow({
    enabled: false,        // Usefull to trigger animation based on some events (did you checked useKonamiCode ?)
    element: document.body // body by default, you can pass any element you want,
    speed: 400             // color change speed
  });
}`}
						</Code>
						<span className="text-xs">Homemade™</span>
					</Section>
				</div>

				<button
					ref={triggerEltRef}
					className="bottom-5 right-5 bg-amber-200 text-amber-800 px-6 pt-4 pb-2 rounded font-bold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all active:scale-95"
					type="button"
				>
					↑ Go to top ↑
				</button>
			</div>
		</>
	);
}
