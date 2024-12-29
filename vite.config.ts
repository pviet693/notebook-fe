import path from "path";
import { defineConfig, loadEnv } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        base: env.VITE_BASE,
        plugins: [TanStackRouterVite(), react(), commonjs()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src")
            }
        },
        build: {
            sourcemap: true
        }
    };
});
