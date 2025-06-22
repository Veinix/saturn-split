import LoadingScreen from "@app/Components/General/LoadingScreen";
import { redirect, useRouteLoaderData } from "react-router";
import type { Route } from "../+types/root";
import type { SessionToken } from "@app/Types/auth.types";
import authService from "@app/Services/AuthService";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Saturn Split | Home" },
        { name: "description", content: "Welcome to Saturn Split!" },
    ];
}

export async function clientLoader() {
    const token = authService.getToken()
    if (!token) throw redirect("/auth/login")
}

export function HydrateFallback() {
    return <LoadingScreen />;
}

export default function Home() {
    const decoded = useRouteLoaderData("rootLayout") as SessionToken
    const { partialName } = decoded.userData
    return (
        <div className="p-5">
            <span className="text-4xl"> Welcome back, </span>
            <span className="text-4xl text-amber-600"> {partialName.split(" ")[0]}</span>
        </div>
    )
}
