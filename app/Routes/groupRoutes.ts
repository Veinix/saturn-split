import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
    index("./Pages/Groups.tsx"),
    route(":groupId", "./Pages/Groups/OpenedGroup.tsx", [
        index("./Pages/Groups/OpenedGroupRoutes/Transactions.tsx"),
        route("members", "./Pages/Groups/OpenedGroupRoutes/Members.tsx")
    ]),
] satisfies RouteConfig