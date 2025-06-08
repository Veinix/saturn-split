import { useOutletContext } from "react-router";
import { useAuth } from "~/Context/authContext";
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
    const { user } = useAuth()

    const displayName = (transactionMember: string): string => {
        return transactionMember === user?.name.split(" ")[0] ? "You" : transactionMember
    }

    return (
        transactions && <div>
            {transactions.map((transaction, index) => {

                return (
                    <div
                        key={`${transaction.borrower}_${transaction.lender}_${transaction.amount}_${index}`}
                        className="border-black border m-3 px-3 py-2 text-white font-bold">
                        {transaction.transactionType === true
                            ? <>
                                <span>{displayName(transaction.borrower)} paid </span>
                                <span>{displayName(transaction.lender)} </span>
                                <span className="text-green-400"> {appConfig.defaultCurrency.symbol} {transaction.amount} </span> </>
                            : <>
                                <span>{displayName(transaction.lender)} lent </span>
                                <span> {displayName(transaction.borrower)}</span>
                                <span className="text-red-400"> {appConfig.defaultCurrency.symbol} {transaction.amount} </span>

                            </>
                        }
                    </div>)
            })}
        </div>
    )
}

