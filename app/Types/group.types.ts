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
    created_by: string | null
    description: string | null
    icon: string | null
    id: string
    name: string
}