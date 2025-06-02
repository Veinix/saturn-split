import { useState } from "react";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Saturn Split" },
        { name: "description", content: "Welcome to Saturn Split!" },
    ];
}

export default function Home() {
    const [user, setUser] = useState<boolean>(false)
    return (
        user ?
            <div>
                <h1> Hello World, user exists</h1>
            </div>
            : <div>
                <h2> Goodbye World, No user found</h2>
            </div>
    )
}
