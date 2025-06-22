
import GeneralButton from "@app/Components/General/GeneralButton";
import LoadingScreen from "@app/Components/General/LoadingScreen";
import GroupListItem from "@app/Components/GroupArea/GroupListItem";
import { getAllGroups } from "@app/Services/GroupsService";
import type { Group } from "@app/Types/group.types";
import { useLoaderData } from "react-router";

export async function clientLoader() {
    return await getAllGroups()
}

export function HydrateFallback() {
    return (<LoadingScreen />);

}

export default function Groups() {
    const allGroups = useLoaderData() as Group[]

    return (
        <div className="w-full p-5">
            <span className="text-4xl"> Grouplist</span>
            <GeneralButton
                text={"Create new Group"}
                margin="ml-5"
            />
            <div className={`
                flex flex-col pt-7 gap-4 
                md:w-3xl md:flex-row
                `}>
                {allGroups.length > 0
                    ? allGroups.map((group) => {
                        return <GroupListItem
                            key={group.id + group.name}
                            id={group.id}
                            name={group.name}
                            icon={group.icon ? group.icon : group.name[0].toUpperCase()}
                            created_by={null}
                            description={null}
                        />
                    })
                    : <span> No Groups found! Make one per chance?</span>}
            </div>
        </div>
    )
}
