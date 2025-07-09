import type { Config } from "@react-router/dev/config";

export default {
    ssr: false, // SPA Mode
    appDirectory: "app",
    routeDiscovery: { mode: "initial" }
} satisfies Config;
