import axios from "axios"
import type { LoaderFunctionArgs } from "react-router"
import { getAllGroups } from "~/Services/GroupsService"
import type { Group } from "~/Types/group.types"

export async function groupsLoader(_: LoaderFunctionArgs): Promise<Group[]> {
    return await getAllGroups()
}
