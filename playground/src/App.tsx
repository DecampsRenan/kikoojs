import { version } from "../../package.json";
import * as effects from "../../src/";
import { Title } from "./components/Title";

export function App() {
	//   👇👇👇👇👇👇👇👇
	// 👉 ADD FUN HERE 👈
	//   👆👆👆👆👆👆👆👆

	return (
		<div className="space-y-10 flex flex-col max-w-150 mx-auto mb-8 px-8">
			<div className="flex flex-col items-center gap-8 h-screen pt-20">
				<Title className="flex flex-col gap-1 justify-center">
					<h1 className={`text-4xl md:text-5xl lg:text-7xl font-extrabold`}>
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
		</div>
	);
}
