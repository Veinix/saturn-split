
import { useLoaderData } from "react-router";
import GroupListItem from "~/Components/GroupArea/GroupListItem";
import type { Group } from "~/utilities/types/groupTypes";


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
                {allGroups && allGroups.map((group) => {
                    return <GroupListItem
                        key={group.id + group.name}
                        id={group.id}
                        name={group.name}
                        members={group.members}
                        groupIcon={group.groupIcon ? group.groupIcon : group.name[0].toUpperCase()}
                    />
                })}
            </div>
        </div>
    )
}
