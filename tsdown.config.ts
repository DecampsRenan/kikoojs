import { defineConfig } from "tsdown";

export default defineConfig({
	platform: "browser",
	entry: ["./src/index.ts", "./src/easter-egg-collection-register.ts"],
	dts: true,
});
