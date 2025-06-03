import {
    route,
    layout,
    index,
    type RouteConfig,
} from "@react-router/dev/routes";
import { groupsLoader } from "./Loaders/GroupsLoader";

export default [
    layout("./Layouts/RootLayout.tsx", [
        layout("./Layouts/HomeLayout.tsx", [
            index("./Pages/Home.tsx")
        ]),
        route("groups", "./Pages/Groups.tsx", {
            loader: groupsLoader
        }),
        route("profile", "./Pages/Profile.tsx"),
    ]),
    route("test", "./Pages/Test.tsx")
] satisfies RouteConfig;
