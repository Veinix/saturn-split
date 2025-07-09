import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
    layout("./Layouts/ErrorLayout.tsx", [
        route("", "./Pages/General/NotFound.tsx"),
    ])
] satisfies RouteConfig