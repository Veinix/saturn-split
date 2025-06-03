
import { useLoaderData } from "react-router";
import GroupListItem from "~/Components/GroupArea/GroupListItem";
import type { Group } from "~/Types/group.types";

export async function loader() {
    return new Response(JSON.stringify(
        {
            data: [
                {
                    id: 1,
                    name: "Omer's Party",
                    members: ["David", "Eran", "Lior"],
                },
                {
                    id: 2,
                    name: "Household",
                    members: ["David", "Omer", "Eran", "Lior"],
                    groupIcon: "🪴"
                }
            ]
        }),
        {
            headers: { 'Content-Type': 'application/json' },
        });
}

export default function Groups() {
    const JSONgroups = useLoaderData()
    const allGroups: Group[] = JSON.parse(JSONgroups)
    return (
        <div className="w-full">
            <span className="text-4xl"> Grouplist</span>
            <div className={`
                flex flex-col pt-7 gap-4 
                md:w-3xl md:flex-row
                `}>
                {allGroups?.length > 0
                    ? allGroups.map((group) => {
                        return <GroupListItem
                            key={group.id + group.name}
                            id={group.id}
                            name={group.name}
                            members={group.members}
                            groupIcon={group.groupIcon ? group.groupIcon : group.name[0].toUpperCase()}
                        />
                    })
                    : <span> No Groups found! Make one</span>}
            </div>
        </div>
    )
}
