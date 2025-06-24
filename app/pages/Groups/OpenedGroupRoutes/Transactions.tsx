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
    const transactionName: string = "Groceries "
    return (
        transactions && <>
            {transactions.length > 0
                ? transactions.map((transaction, index) => {
                    return (
                        <div
                            key={`${transaction.borrowerId}_${transaction.lenderId}_${transaction.amount}_${index}`}
                            className="flex text-white border border-yellow-200 font-bold h-18 md:h-20 items-center gap-3">

                            <div className="p-3 h-full flex items-center justify-center bg-pink-500">

                            </div>
                            <div className=" p-3 bg-pink-800 h-full flex items-center justify-center">

                            </div>

                            <div className="flex gap-2 text-md m-0 p-0">
                                <span>{displayName(transaction.lenderId)} paid </span>
                                <span className={"text-gray-400"}> {appConfig.defaultCurrency.symbol} {Math.abs(transaction.amount)} </span>
                                <span>for</span>
                                <span className="text-blue-400">{transactionName}</span>
                            </div>
                            <div className="flex gap-2 text-xs">
                                <span>Your share is</span>
                                <span className={"text-red-400"}> {appConfig.defaultCurrency.symbol} {Math.abs(transaction.amount)} </span>
                            </div>
                        </div>)
                })
                : <div className="flex items-center justify-center">
                    No transactions made yet!
                </div>
            }
        </>

    )
}

