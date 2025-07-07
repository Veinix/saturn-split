import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    root: "app",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "app"),
            "@Layouts": path.resolve(__dirname, "app/Layouts"),
            "@Routes": path.resolve(__dirname, "app/Routes"),
            "@Assets": path.resolve(__dirname, "app/Assets"),
            "@Components": path.resolve(__dirname, "app/Components"),
            "@Services": path.resolve(__dirname, "app/Services"),
            "@Hooks": path.resolve(__dirname, "app/Hooks"),
            "@Pages": path.resolve(__dirname, "app/Pages"),
            "@Types": path.resolve(__dirname, "app/Types"),
            "@Utilities": path.resolve(__dirname, "app/Utilities"),
            "@Context": path.resolve(__dirname, "app/Context"),
        },
    },
    server: {
        host: "0.0.0.0"
    }
});
