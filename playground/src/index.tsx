import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./style.css";
import { registerEasterEggCollection } from "../../src/easter-egg-collection.ts";

registerEasterEggCollection();

// biome-ignore lint/style/noNonNullAssertion: always defined here.
createRoot(document.querySelector("#app")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
