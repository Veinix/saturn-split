export type Transaction = {
    lender: string,
    borrower: string,
    amount: number,
    transactionType: boolean, // True = Positive = Paid back. False = Negative = Loaned
    transactionDate?: string,
}
export type Group = {
    id: string;
    name: string;
    members: string[];
    description?: string;
    groupIcon?: string;
    transactions?: Transaction[];
    totalBalance?: number;
}