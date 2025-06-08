import {
    route,
    layout,
    index,
    type RouteConfig,
    prefix,
} from "@react-router/dev/routes";

export default [
    layout("./Layouts/RootLayout.tsx", [
        index("./Pages/Home.tsx"),
        ...prefix("groups", [
            index("./Pages/Groups.tsx"),
            route(":groupId", "./Pages/Groups/OpenedGroup.tsx", [
                index("./Pages/Groups/OpenedGroupRoutes/Transactions.tsx"),
                route("members", "./Pages/Groups/OpenedGroupRoutes/Members.tsx")
            ]),
        ]),
        route("profile", "./Pages/Profile.tsx"),
        route("people", "./Pages/People.tsx"),
    ]),
    route("test", "./Pages/Test.tsx")
] satisfies RouteConfig;
