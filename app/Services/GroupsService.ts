import type { Group } from "~/Types/group.types";
import { appConfig } from "~/Utilities/AppConfig";
import axios from "axios";
import api from "./Axios";


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


