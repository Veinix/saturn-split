export type Transaction = {
    transactionId: string,
    groupId?: string,
    lenderId: string,
    borrowerId: string,
    amount: number,
    transactionType: boolean, // True = Positive = Paid back. False = Negative = Loaned
    transactionDate?: string,
}
export type Group = {
    created_by: { username: string, id: string }
    description: string | null
    icon: string | null
    id: string
    name: string
}

export type GroupOverview = Group & {
    members: { username: string, id: string }[]
}

export enum GroupMemberRoles {
    GroupOwner = "owner",
    GroupMember = "member",
}

// Expense types
export type ExpensePayload = {
    groupId: string,
    lenderId: string,
    amount: number,
    transactionDate: string,
    fullPaid: boolean,
}