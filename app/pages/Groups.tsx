
import { useLoaderData, useNavigation } from "react-router";
import LoadingScreen from "~/Components/General/LoadingScreen";
import GroupListItem from "~/Components/GroupArea/GroupListItem";
import type { Group } from "~/Types/group.types";
import { getAllGroups } from "~/Services/GroupsService";

export async function loader() {
    return await getAllGroups()
}

export function HydrateFallback() {
    return (<LoadingScreen />);

}

export default function Groups() {
    const allGroups = useLoaderData() as Group[]
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <div className="w-full">
            <span className="text-4xl"> Grouplist</span>
            <div className={`
                flex flex-col pt-7 gap-4 
                md:w-3xl md:flex-row
                `}>
                {isLoading
                    ? <LoadingScreen />
                    : allGroups.length > 0
                        ? allGroups.map((group) => {
                            return <GroupListItem
                                key={group.id + group.name}
                                id={group.id}
                                name={group.name}
                                // members={group.members}
                                groupIcon={group.name[0].toUpperCase()}
                                created_by={null}
                                description={null}
                                icon_url={null} />
                        })
                        : <span> No Groups found! Make one</span>}
            </div>
        </div>
    )
}
