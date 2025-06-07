import { useLoaderData } from "react-router"
import UserProfileBox from "./UserProfileBox"
import type { Profile } from "~/Types/auth.types"

export default function ChooseUser() {
    const userList: Profile[] = useLoaderData().users as Profile[]
    return (
        <div className="w-full h-full flex flex-col gap-10 items-center justify-center">
            {userList.map((user) => {
                return (
                    <UserProfileBox
                        id={user.id}
                        name={user.name}
                        role={user.role}
                    />
                )
            })}
        </div>
    )
}
