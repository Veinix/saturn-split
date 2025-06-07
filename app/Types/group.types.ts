export type Transaction = {
    lender: string,
    borrower: string,
    amount: number,
    transactionType: boolean, // True = Positive = Paid back. False = Negative = Loaned
    transactionDate?: string,
}
export type Group = {
    created_by: string | null
    description: string | null
    icon_url: string | null
    id: string
    name: string
}