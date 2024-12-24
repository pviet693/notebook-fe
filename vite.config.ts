import path from "path";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

// https://vite.dev/config/
export default defineConfig({
    plugins: [TanStackRouterVite(), react(), commonjs()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    }
});
