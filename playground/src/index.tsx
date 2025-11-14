import "@fontsource/borel";
import "@fontsource-variable/reddit-mono";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";
import "./style.css";
// import "../../src/easter-egg-collection-register.ts";

// biome-ignore lint/style/noNonNullAssertion: always defined here.
createRoot(document.querySelector("#app")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
