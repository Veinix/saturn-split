import { NavLink, Outlet } from "react-router";
import testConstants from "~/Utilities/TestConstants";
// export async function loader({ params }: Route.LoaderArgs) {
//     return await new Promise<Group>((resolve) => {
//         setTimeout(() => {
//             resolve(data);
//         }, 300);
//     })
// }

function OpenedGroup() {
    const singleVar = testConstants.testSingleGroup
    const { id, name, members, groupIcon, transactions } = singleVar

    const offset = "2"

    return (
        <div>
            <div className="flex flex-col items-center w-full fixed top-0 left-0 z-5 bg-black">
                {/* Header */}
                <span className="text-9xl"> {groupIcon}</span>
                <span className="absolute ml-8 mt-3 text-5xl font-bold z-1 text-green-600"> {name}</span>
                <span className="absolute ml-10 mt-5 text-5xl font-bold z-2"> {name}</span>
                {/* Debt Owed */}
                <div>

                </div>
                {/* Group Options */}
                <div className="flex overflow-x-auto gap-4 rounded-lg bg-amber-700 p-3 mt-5 w-full">
                    <NavLink to={"transactions"}
                        className=" bg-white rounded-xl px-4 py-3 text-black w-fit font-bold"> Transactions </NavLink>
                    <NavLink to={"members"}
                        className=" bg-white rounded-xl px-4 py-3 text-black w-fit font-bold"> Members </NavLink>
                </div>
            </div>

            {/* Transaction History */}
            <div className="rounded-xl w-full border border-pink-100 mt-54 pt-3 px-3 bg-none overflow-hidden z-0">
                <Outlet context={singleVar} />
            </div>
        </div>

    )
}

export default OpenedGroup