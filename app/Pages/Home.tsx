import { useRouteLoaderData } from "react-router";
import type { Route } from "../+types/root";
import authService from "@app/Services/AuthService";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Saturn Split | Home" },
        { name: "description", content: "Welcome to Saturn Split!" },
    ];
}

export default function Home() {
    const { token } = useRouteLoaderData("root")
    const { partialName } = authService.decodeAuthToken(token).userData
    return (
        <div className="p-5">
            <span className="text-4xl"> Welcome back, </span>
            <span className="text-4xl text-amber-600"> {partialName.split(" ")[0]}</span>
        </div>
    )
}
