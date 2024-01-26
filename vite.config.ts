import { defineConfig } from "vite";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/

/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [react(), chunkSplitPlugin()],
	build: {
		chunkSizeWarningLimit: 1600,
	},
	assetsInclude: ["**/*.gltf", "**/*.glb"],
});
