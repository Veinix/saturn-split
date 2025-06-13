import type { Group } from "@app/Types/group.types"
import { NavLink } from "react-router"
interface GroupListItemProps extends Group {
    icon: string
}

function GroupListItem({ id, name, description, icon }: GroupListItemProps) {
    return (
        <NavLink
            to={id}
            className={`
        group
        hover:cursor-pointer
        flex flex-row border border-amber-800 rounded-lg w-full px-4 py-2
        hover:bg-amber-800 transition-colors duration-300 hover:text-white`}>
            <div className="flex items-center justify-center">
                <div className="border-2 border-amber-800 group-hover:border-black transition-colors duration-300 flex items-center justify-center w-12 h-12 bg-amber-800 rounded-full mr-4 text-black">
                    <span className="text-2xl font-bold">{icon}</span>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-2xl">{name}</p>
                {/* <span className="text-gray-600 group-hover:text-black transition-colors duration-300">{members.join(", ")}</span> */}
            </div>
        </NavLink>
    )
}

export default GroupListItem