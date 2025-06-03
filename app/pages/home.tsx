
import { appConfig } from "~/Utilities/AppConfig";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Saturn Split | Home" },
        { name: "description", content: "Welcome to Saturn Split!" },
    ];
}

export default function Home() {

    const firstName = appConfig.testUser.name.split(" ")[0];
    return (
        <div>
            <span className="text-4xl"> Welcome back,</span>
            <span className="text-4xl text-amber-600"> {firstName}</span>
        </div>

    )
}
