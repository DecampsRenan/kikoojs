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
		try {
			setStatus("loading");
			const response = await fetch(src);
			if (!response.ok) {
				throw new Error("Cannot fetch script");
			}

			const rawExternalScriptContent = await response.text();
			setStatus("ready");
			console.log("Script loaded", rawExternalScriptContent);
			return rawExternalScriptContent;
		} catch (errorLoadingScript) {
			console.log("Error loading script", errorLoadingScript);
			setStatus("error");
			return;
		}
	}, [src]);

	useLayoutEffect(() => {
		setStatus("loading");
		if (cache && cachedScript) {
			console.log("loaded from cache");
			scriptRef.current.innerHTML = cachedScript;
		} else {
			getSrcContent().then((rawExternalScriptContent) => {
				if (!rawExternalScriptContent) return;
				storage.setItem(`internal-script:${src}`, rawExternalScriptContent);
				scriptRef.current.innerHTML = rawExternalScriptContent;
			});
		}

		document.body.appendChild(scriptRef.current);
		setStatus("ready");
		return () => {
			// Cleanup
			document.body.removeChild(scriptRef.current);
		};
	}, [src, cachedScript, cache, getSrcContent, storage.setItem]);

	return {
		isReady: status === "ready",
		isLoading: status === "loading",
		script: scriptRef.current,
	};
};
