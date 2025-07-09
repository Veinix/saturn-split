import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
    layout("./Layouts/AuthLayout.tsx", [
        route("login", "./Pages/Auth/Login.tsx"),
        route("register", "./Pages/Auth/Register.tsx"),
        route("referral", "./Pages/Auth/ReferralCode.tsx"),
    ])
] satisfies RouteConfig