import { useAuth } from "@app/Context/authContext";
import type { Transaction } from "@app/Types/group.types";
import appConfig from "@app/Utilities/AppConfig";
import { useOutletContext } from "react-router";


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
    const { session } = useAuth()

    // Need to use IDs, not just names. 
    // Works for now because no duplicates but should fix
    const displayName = (transactionMember: string): string => {
        return transactionMember === session?.userData.partialName.split(" ")[0] ? "You" : transactionMember
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

