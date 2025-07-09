import type { ExpensePayload, Group, GroupOverview } from "@app/types/group.types";
import api from "./Axios";

// ****************************
// * GENERAL GROUP METHODS
// ****************************
// Method to get all groups
async function getAllGroups(): Promise<Group[]> {
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

async function getSingleGroupData(groupId: string): Promise<GroupOverview | void> {
    try {
        const res = await api.get(`/groups/${groupId}`)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(`[Group Service] Error fetching group "${groupId}"`, error)
    }
}

async function checkIfUserIsGroupMember(token: string, groupId: string): Promise<Boolean> {
    try {
        const res = await api.post(`/groups/${groupId}`, token)
        return res.data
    } catch (error) {
        return false
    }
}

async function addMember(groupId: string, userId: string) {

}

async function addExpense(expenseLayout: ExpensePayload) {
    try {
        const res = await api.post(`/groups/${expenseLayout.groupId}`, expenseLayout)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(`[Group Service] Error adding expense`, error)
    }
}
const groupsService = {
    getAllGroups,
    getSingleGroupData,
    checkIfUserIsGroupMember,
    addMember,
    addExpense
}
export default groupsService