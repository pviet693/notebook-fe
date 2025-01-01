import path from "path";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
import compression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
    plugins: [TanStackRouterVite(), react(), commonjs(), compression()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    build: {
        sourcemap: false,
        minify: "terser",
        cssCodeSplit: true,
        chunkSizeWarningLimit: 1000
    },
    preview: {
        port: 5173,
        open: false
    }
});
