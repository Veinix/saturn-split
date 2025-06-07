import type { Group } from "~/Types/group.types";
import api from "./Axios";

// ****************************
// * GENERAL GROUP METHODS
// ****************************
// Method to get all groups
export async function getAllGroups(): Promise<Group[]> {
    try {
        const res = await api.get("/groups")
        console.log(res.data)
        return res.data

    } catch (error) {
        console.log("[Group Service] Error fetching groups:", error);
        return []
    }
}

// Method to create a new group

// Method to delete a group

// Method to hide a group

// ****************************
// * SINGLE GROUP METHODS
// ****************************

export async function getSingleGroupData(groupId: string): Promise<Group | void> {
    try {
        const res = await api.get(`/groups/${groupId}`)
        return res.data
    } catch (error) {
        console.log(`[Group Service] Error fetching group "${groupId}"`, error)
        return
    }
}