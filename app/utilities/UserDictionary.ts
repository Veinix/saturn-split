import type { User } from "@app/Types/auth.types";
import type { Group, Transaction } from "@app/Types/group.types";


type UserIDPair = { id: string, name: string };

export const userRecordCreator = async (transactions: Transaction[]) => {
    // Get all the IDs in a set
    const allIds = new Set(transactions.flatMap(({ lenderId, borrowerId }) => [lenderId, borrowerId]))
}

export const userDictionary = async (usersArray: User[]) => {

    const userDict: Record<string, string> = usersArray.reduce(
        (dict, { id, full_name }) => {
            dict[id] = full_name;
            return dict;
        },
        {} as Record<string, string>
    );

    return userDict;
};