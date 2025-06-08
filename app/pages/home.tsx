
import LoadingScreen from "~/Components/General/LoadingScreen";
import type { Route } from "./+types/Home";
import ChooseUser from "~/Components/Users/ChooseUser";
import { useAuth } from "~/Context/authContext";

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
    // return await getTest()
    return await {
        users: [
            {
                id: "4f48cb73-b955-4d92-bd9f-2621f7324841",
                name: "David Aviles",
                role: "developer"
            },
            {
                id: "4f483373-b955-4d92-bd9f-2621f7324841",
                name: "Eran Farkash",
                role: "developer"
            },
            {
                id: "4f484473-b955-4d92-bd9f-2621f7324841",
                name: "Omer Nussboim",
                role: "developer"
            },
        ]
    }
}


export default function Home() {
    const { user, status, logout } = useAuth()
    if (status === "loading") return <LoadingScreen />
    if (!user) return (
        <div className="flex items-center justify-center flex-col mt-10">
            <span className="text-4xl mb-10">Oi cunt, you not logged in innit?</span>
            <ChooseUser />
        </div>
    )
    else return (
        <div className="p-5">
            <span className="text-4xl"> Welcome back, </span>
            <span className="text-4xl text-amber-600"> {user.name.split(" ")[0]}</span>
        </div>
    )
}
