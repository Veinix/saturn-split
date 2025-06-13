
import useScrollUp from "@app/Hooks/useScrollUp";
import appConfig from "@app/Utilities/AppConfig";
import testConstants from "@app/Utilities/TestConstants";
import { NavLink, Outlet } from "react-router";


function OpenedGroup() {
    const singleVar = testConstants.testSingleGroup
    const { showTopBtn, scrollToTop } = useScrollUp(200)
    const { id, name, members, groupIcon, transactions } = singleVar

    const totalOwed = -500

    const handleClickUp = () => {
        scrollToTop()
    }

    return (

        <div className="flex flex-col items-center w-full bg-black">
            {/* Header */}
            <div className="w-full h-1/3 z-1 flex">
                <span className="text-9xl"> {groupIcon}</span>
                <div className="pt-10">
                    <span className="absolute ml-2 mt-1 text-5xl font-semibold z-1 text-green-600"> {name}</span>
                    <span className="absolute text-5xl font-bold z-2"> {name}</span>
                </div>
            </div>
            <div className="sticky w-full top-0 h-16 mb-16 flex flex-col z-20">
                {/* Group Options */}
                <div className="flex gap-4 bg-amber-700 p-3 w-full z-2">
                    <NavLink to={"./"}
                        className=" bg-white rounded-xl px-4 py-3 text-black w-fit font-bold"> Transactions </NavLink>
                    <NavLink to={"./members"}
                        className=" bg-white rounded-xl px-4 py-3 text-black w-fit font-bold"> Members </NavLink>
                </div>

                {/* Stats */}
                <div className="w-full bg-amber-700 h-12 flex items-center justify-center p-2">
                    {totalOwed > 0
                        ? <p>
                            <span>{` Eran`}</span>{" "}
                            <span>owes you</span>{" "}
                            <span className="text-green-400 font-bold">{appConfig.defaultCurrency.symbol}{totalOwed}</span>
                        </p>
                        : <p>
                            <span>You owe</span>{" "}
                            <span>{` Eran`}</span>{" "}
                            <span className="text-red-300 font-bold">{appConfig.defaultCurrency.symbol}{Math.abs(totalOwed)}</span>
                        </p>
                    }

                </div>
            </div>


            {/* Transaction History */}
            <section className="rounded-xl w-full border border-pink-100 pt-3 px-3 bg-none z-0">
                <Outlet context={singleVar} />
            </section>

            {
                showTopBtn && (
                    <button
                        onClick={handleClickUp}
                        className="fixed bottom-26 right-6 md:bottom-3 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full shadow-lg transition">
                        ↑
                    </button>
                )
            }
        </div >

    )
}

export default OpenedGroup