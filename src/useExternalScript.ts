import { useCallback, useLayoutEffect, useRef, useState } from "react";

export type UseExternalScriptParams = {
	cache: boolean;
	storage: Storage;
};

export const useExternalScript = (
	src: string,
	params?: UseExternalScriptParams,
) => {
	const { cache = true, storage = localStorage } = params ?? {};

	const [status, setStatus] = useState<
		"not-loaded" | "loading" | "error" | "ready"
	>("not-loaded");

	// Create eltRef so we are able to remove / add the script when we want
	// Usefull for the useEffect/useLayoutEffect cleanup function
	const scriptRef = useRef<HTMLScriptElement>(document.createElement("script"));

	// check is the script is already loaded in storage
	const cachedScript = storage.getItem(`internal-script:${src}`);

	const getSrcContent = useCallback(async () => {
		if (cache && cachedScript) return cachedScript;
		try {
			const response = await fetch(src);
			if (!response.ok) {
				throw new Error("Cannot fetch script");
			}

			const rawExternalScriptContent = await response.text();
			if (cache) {
				storage.setItem(`internal-script:${src}`, rawExternalScriptContent);
			}
			return rawExternalScriptContent;
		} catch (errorLoadingScript) {
			console.log("Error loading script", errorLoadingScript);
			setStatus("error");
			return;
		}
	}, [src, cache, cachedScript, storage.setItem]);

	useLayoutEffect(() => {
		setStatus("loading");
		getSrcContent().then((rawExternalScriptContent) => {
			if (!rawExternalScriptContent) return;
			scriptRef.current.innerHTML = rawExternalScriptContent;
			document.body.appendChild(scriptRef.current);
			// Give time to the browser to parse the added js
			setTimeout(() => setStatus("ready"));
		});

		return () => {
			// Cleanup
			scriptRef.current?.remove();
		};
	}, [getSrcContent]);

	return {
		isReady: status === "ready",
		isLoading: status === "loading",
		script: scriptRef.current,
	};
};
