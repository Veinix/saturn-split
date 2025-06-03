import type { Group } from "~/Types/group.types"
interface GroupListItemProps extends Group { }

function GroupListItem({ id, name, description, members, transactions, totalBalance, groupIcon }: GroupListItemProps) {
    return (
        <div className="flex flex-row border border-amber-800 rounded-lg w-full px-4 py-2">
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center w-12 h-12 bg-amber-800 rounded-full mr-4 text-black">
                    <span className="text-2xl font-bold">{groupIcon}</span>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-2xl">{name}</p>
                <span className="text-gray-600">{members.join(", ")}</span>
            </div>
        </div>
    )
}

export default GroupListItem