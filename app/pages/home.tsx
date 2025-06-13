import LoadingScreen from "@app/Components/General/LoadingScreen";
import { useAuth } from "@app/Context/authContext";
import { tokenUtils } from "@app/Utilities/AuthUtilities";
import { redirect } from "react-router";
import type { Route } from "../+types/root";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Saturn Split | Home" },
        { name: "description", content: "Welcome to Saturn Split!" },
    ];
}

export async function clientLoader() {
    const token = tokenUtils.getToken()
    if (!token) throw redirect("/auth/login")

}
clientLoader.hydrate = true as const;

export function HydrateFallback() {
    return <LoadingScreen />;
}

export default function Home() {
    const { session, loading } = useAuth()
    if (loading) return <LoadingScreen />
    if (!session) return <div>idk test</div>
    else return (
        <div className="p-5">
            <span className="text-4xl"> Welcome back, </span>
            <span className="text-4xl text-amber-600"> {session?.userData.partialName.split(" ")[0]}</span>
        </div>
    )
}
