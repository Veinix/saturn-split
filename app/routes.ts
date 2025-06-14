import {
    route,
    layout,
    index,
    type RouteConfig,
    prefix,
} from "@react-router/dev/routes";
import authRoutes from "./Routes/authRoutes";
import groupRoutes from "./Routes/groupRoutes";
import otherRoutes from "./Routes/otherRoutes";

export default [
    layout("./Layouts/RootLayout.tsx", [
        index("./Pages/Home.tsx"),

        ...prefix("groups", groupRoutes),

        route("profile", "./Pages/Profile.tsx"),

        route("people", "./Pages/People.tsx"),
    ]),
    ...prefix("auth", authRoutes),
    ...prefix("/*", otherRoutes)

] satisfies RouteConfig;
