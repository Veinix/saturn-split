import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
} from "@react-router/dev/routes";
import { groupsLoader } from "~/Loaders/groupsLoader";

export default [
    // Home page
    layout("./Layouts/RootLayout.tsx", [
        layout("./Layouts/HomeLayout.tsx", [
            index("./Pages/Home.tsx")
        ]),
        route("groups", "./Pages/Groups.tsx", {
            loader: groupsLoader
        }),
        route("profile", "./Pages/Profile.tsx"),
    ]),

] satisfies RouteConfig;
