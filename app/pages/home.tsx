import LoadingScreen from "@app/Components/General/LoadingScreen";
import { tokenUtils } from "@app/Utilities/AuthUtilities";
import { Navigate, redirect, useLoaderData } from "react-router";
import type { Route } from "../+types/root";
import { useAuth } from "@app/Hooks/useAuth";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Saturn Split | Home" },
        { name: "description", content: "Welcome to Saturn Split!" },
    ];
}

export async function clientLoader() {
    const token = await tokenUtils.getToken()
    if (!token) {
        throw redirect("/auth/login")
    }

    const decoded = tokenUtils.decodeAuthToken(token);
    if (!decoded || typeof decoded !== "object") {
        throw redirect("/auth/login");
    }

    return decoded;
}
clientLoader.hydrate = true as const;

export function HydrateFallback() {
    return <LoadingScreen />;
}

export default function Home() {
    const { session, loading } = useAuth()

    const userName = session?.userData.partialName || "User";
    if (loading) return <LoadingScreen />

    else return (
        <div className="p-5">
            <span className="text-4xl"> Welcome back, </span>
            <span className="text-4xl text-amber-600"> {userName.split(" ")[0]}</span>
        </div>
    )
}
