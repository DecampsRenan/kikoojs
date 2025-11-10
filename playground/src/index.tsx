import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./style.css";

// biome-ignore lint/style/noNonNullAssertion: always defined here.
createRoot(document.querySelector("#app")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
