import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
} from "@react-router/dev/routes";

export default [
    // Home page
    layout("./layouts/rootLayout.tsx", [
        index("./pages/home.tsx"),
        route("about", "./pages/about.tsx"),
    ]),

    // Standalone routes
    // route("offline", "./pages/offline.tsx"),
    route("splash", "./pages/splash.tsx"),

    // Auth layout with nested routes
    // layout("./layouts/auth-layout.tsx", [
    //     route("login", "./pages/auth/login.tsx"),
    //     route("register", "./pages/auth/register.tsx"),
    // ]),

    // Main App layout with protected pages
    // layout("./layouts/app-layout.tsx", [
    //     index("./pages/dashboard.tsx"),
    //     route("settings", "./pages/settings.tsx"),
    //     route("profile", "./pages/profile.tsx"),
    // ]),
] satisfies RouteConfig;
