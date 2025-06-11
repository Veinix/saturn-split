
import LoadingScreen from "~/Components/General/LoadingScreen";
import type { Route } from "./+types/Home";
import { useAuth } from "~/Context/authContext";
import RegisterFields from "~/Components/AuthArea/RegisterFields";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Saturn Split | Home" },
        { name: "description", content: "Welcome to Saturn Split!" },
    ];
}
export function HydrateFallback() {
    return <LoadingScreen />;
}
export async function loader() {

}


export default function Home() {
    const { user, loading, logout } = useAuth()
    if (loading) return <LoadingScreen />
    if (!user) return (
        <div className="flex items-center justify-center flex-col mt-10">
            <span className="text-4xl mb-10">Oi cunt, you not logged in innit?</span>
            <RegisterFields />
        </div>
    )
    else return (
        <div className="p-5">
            <span className="text-4xl"> Welcome back, </span>
            <span className="text-4xl text-amber-600"> {user.full_name.split(" ")[0]}</span>
        </div>
    )
}
