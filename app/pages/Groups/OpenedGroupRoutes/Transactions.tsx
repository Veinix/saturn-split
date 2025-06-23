import type { Transaction } from "@app/Types/group.types";
import appConfig from "@app/Utilities/AppConfig";
import { useOutletContext, useRouteLoaderData } from "react-router";

export default function Transactions() {
    const transactions = useOutletContext<Transaction[]>()
    const session = useRouteLoaderData("rootLayout") as { userData: { partialName: string } }
    // TODO Need to use IDs, not just names. 
    // TODO Works for now because no duplicates but should fix
    const displayName = (transactionMember: string): string => {
        return transactionMember === session?.userData.partialName.split(" ")[0] ? "You" : transactionMember
    }

    return (
        transactions && <div>
            {transactions.length > 0
                ? transactions.map((transaction, index) => {
                    return (
                        <div
                            key={`${transaction.borrowerId}_${transaction.lenderId}_${transaction.amount}_${index}`}
                            className="border-black border px-3 py-2 text-white font-bold">
                            {transaction.transactionType === true
                                ? <>
                                    <span>{displayName(transaction.borrowerId)} paid </span>
                                    <span>{displayName(transaction.lenderId)} </span>
                                    <span className="text-green-400"> {appConfig.defaultCurrency.symbol} {transaction.amount} </span> </>
                                : <>
                                    <span>{displayName(transaction.lenderId)} lent </span>
                                    <span> {displayName(transaction.borrowerId)}</span>
                                    <span className="text-red-400"> {appConfig.defaultCurrency.symbol} {transaction.amount} </span>

                                </>
                            }
                        </div>)
                })
                : <div className="flex items-center justify-center">
                    No transactions made yet!
                </div>
            }
        </div>

    )
}

