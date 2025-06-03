export type Transaction = {
    type: "expense" | "payment";
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