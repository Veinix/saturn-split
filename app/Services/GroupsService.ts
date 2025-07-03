import type { ExtendedGroup, Group } from "@app/Types/group.types";
import api from "./Axios";

// ****************************
// * GENERAL GROUP METHODS
// ****************************
// Method to get all groups
export async function getAllGroups(): Promise<Group[]> {
    try {
        const res = await api.get("/groups")
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

export async function getSingleGroupData(groupId: string): Promise<ExtendedGroup | void> {
    try {
        const res = await api.get(`/groups/${groupId}`)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(`[Group Service] Error fetching group "${groupId}"`, error)
    }
}

export async function checkIfUserIsGroupMember(token: string, groupId: string): Promise<Boolean> {
    try {
        const res = await api.post(`/groups/${groupId}`, token)
        return res.data
    } catch (error) {
        return false
    }
}