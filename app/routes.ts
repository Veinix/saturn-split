import {
    route,
    layout,
    index,
    type RouteConfig,
    prefix,
} from "@react-router/dev/routes";
import authRoutes from "./routes/authRoutes";
import groupRoutes from "./routes/groupRoutes";
import otherRoutes from "./routes/otherRoutes";

export default [
    layout("./Layouts/RootLayout.tsx", { id: "rootLayout" }, [
        index("./Pages/Home.tsx"),

        ...prefix("groups", groupRoutes),

        route("profile", "./Pages/Profile.tsx"),

        route("people", "./Pages/People.tsx"),
    ]),
    ...prefix("auth", authRoutes),
    ...prefix("/*", otherRoutes)

] satisfies RouteConfig;
