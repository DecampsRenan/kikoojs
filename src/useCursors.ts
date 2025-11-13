import * as cursors from "cursor-effects";
import { useLayoutEffect, useMemo } from "react";
import { match, P } from "ts-pattern";

type Cursor =
	| "rainbowCursor"
	| "springyEmojiCursor"
	| "bubbleCursor"
	| "fairyDustCursor"
	| "emojiCursor"
	| "textFlag"
	| "trailingCursor"
	| "followingDotCursor"
	| "characterCursor";

type CursorConfig =
	| {
			name: "rainbowCursor";
			config: {
				length: number;
				colors: Array<string>;
				size: number;
			};
	  }
	| {
			name: "springyEmojiCursor";
			config: {
				emoji: string;
			};
	  }
	| {
			name: "bubbleCursor";
			config: {
				fillColor: string;
				strokeColor: string;
			};
	  }
	| {
			name: "fairyDustCursor";
			config: {
				colors: Array<string>;
				fairySymbol: string;
			};
	  }
	| {
			name: "emojiCursor";
			config: {
				emoji: Array<string>;
				delay: number;
			};
	  }
	| {
			name: "textFlag";
			config: {
				text: string;
				color: Array<string>;
			};
	  }
	| {
			name: "trailingCursor";
			config: {
				particles: number;
				rate: number;
				baseImageSrc: string;
			};
	  }
	| {
			name: "followingDotCursor";
			config: {
				color: Array<string>;
			};
	  }
	| {
			name: "characterCursor";
			config: {
				element: HTMLElement;
				characters: Array<string>;
				font: string;
				colors: Array<string>;
				characterLifeSpanFunction: () => number;
				initialCharacterVelocityFunction: () => { x: number; y: number };
				characterVelocityChangeFunctions: {
					x_func: (age: number, lifeSpan: number) => number;
					y_func: (age: number, lifeSpan: number) => number;
				};
				characterScalingFunction: (age: number, lifeSpan: number) => number;
				characterNewRotationDegreesFunction: (
					age: number,
					lifeSpan: number,
				) => number;
			};
	  };

export type UseCursorsOptions<
	ContainerElement extends HTMLElement = HTMLElement,
> = {
	enabledCursors: Cursor | Array<Cursor> | CursorConfig | Array<CursorConfig>;
	containerElement?: ContainerElement | null;
};

export const useCursors = <ContainerElement extends HTMLElement = HTMLElement>(
	options: UseCursorsOptions<ContainerElement>,
) => {
	const { enabledCursors, containerElement = document.body } = useMemo(
		() => options ?? {},
		[options],
	);

	const commonOptions = useMemo(
		() => ({
			element: containerElement ?? undefined,
		}),
		[containerElement],
	);

	useLayoutEffect(() => {
		if (containerElement === null) return;
		const cursorInstances = match(enabledCursors)
			.with(P.string, (cursorEffect: Cursor) => [
				// biome-ignore lint/performance/noDynamicNamespaceImportAccess: Necessary here
				// biome-ignore lint/suspicious/noExplicitAny: I don't know how to type it
				new (cursors[cursorEffect] as any)(commonOptions),
			])
			.with(P.array(P.string), (cursorEffectConfig) =>
				cursorEffectConfig.map(
					// biome-ignore lint/performance/noDynamicNamespaceImportAccess: Necessary here
					// biome-ignore lint/suspicious/noExplicitAny: I don't know how to type it
					(effect) => new (cursors[effect] as any)(commonOptions),
				),
			)
			.with({ name: P.string, config: P.unknown }, (cursorEffectConfig) => [
				// biome-ignore lint/performance/noDynamicNamespaceImportAccess: Necessary here
				// biome-ignore lint/suspicious/noExplicitAny: I don't know how to type it
				new (cursors[cursorEffectConfig.name] as any)({
					...commonOptions,
					...cursorEffectConfig.config,
				}),
			])
			.with(
				P.array({ name: P.string, config: P.unknown }),
				(cursorEffectConfig) =>
					cursorEffectConfig.map(
						(effect) =>
							// biome-ignore lint/performance/noDynamicNamespaceImportAccess: Necessary here
							// biome-ignore lint/suspicious/noExplicitAny: I don't know how to type it
							new (cursors[effect.name] as any)({
								...commonOptions,
								...effect.config,
							}),
					),
			)
			.exhaustive();

		return () => {
			cursorInstances.forEach((cursor) => {
				cursor.destroy();
			});
		};
	}, [enabledCursors, commonOptions, containerElement]);
};
