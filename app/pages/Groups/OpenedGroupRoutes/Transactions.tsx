import { useOutletContext } from "react-router";
import type { Transaction } from "~/Types/group.types";
import { appConfig } from "~/Utilities/AppConfig";

type ContextType = {
    id: string;
    name: string;
    members: string[];
    description?: string;
    groupIcon?: string;
    transactions?: Transaction[];
    totalBalance?: number;
}
export default function Transactions() {
    const { transactions } = useOutletContext<ContextType>()
    return (
        transactions && <div>
            {transactions.map((transaction) => {
                return (
                    <div className="border-black border m-3 px-3 py-2 text-white font-bold">
                        {transaction.transactionType
                            ? <>
                                <span>{transaction.borrower} paid </span>
                                <span>{transaction.lender} </span>
                                <span className="text-green-400"> {appConfig.defaultCurrency.symbol} {transaction.amount} </span> </>
                            : <>
                                <span>{transaction.lender} lended </span>
                                <span> {transaction.borrower}</span>
                                <span className="text-red-400"> {appConfig.defaultCurrency.symbol} {transaction.amount} </span>

                            </>
                        }
                    </div>)
            })}
        </div>
    )
}

