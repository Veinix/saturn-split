
import type { Route } from ".react-router/types/app/Pages/Groups/+types/OpenedGroup";
import useModal from "@app/hooks/useModal";
import GeneralButton from "@app/components/General/GeneralButton";
import ExpenseModalContent from "@app/components/GroupArea/Modals/ExpenseModalContent";
import useScrollUp from "@app/hooks/useScrollUp";
import { NavLink, Outlet, useLoaderData } from "react-router";
import Modal from "@app/components/General/Modal";
import groupsService from "@app/services/GroupsService";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    if (!params.groupId) throw new Error("No group ID in URL");
    const singleGroupData = await groupsService.getSingleGroupData(params.groupId);
    const userDictionary: { id: string, name: string }[] = []
    return [singleGroupData, userDictionary]
}

export default function OpenedGroup() {
    const [transactions, userDictionary] = useLoaderData()
    const [showModal, toggleModal, modalConfig, updateModalContent] = useModal()
    const { showTopBtn, scrollToTop } = useScrollUp(200)
    const groupIcon = "🪴"
    const groupName = "Household"

    const handleClickUp = () => {
        scrollToTop()
    }

    const handleOpenExpenseModal = () => {
        updateModalContent({ title: "Add Expense", content: <ExpenseModalContent /> })
        toggleModal()
    }

    const handleOpenAddMemberModal = () => { }
    const handleOpenEditGroupModal = () => { }

    return (

        <div className="flex flex-col items-center w-full ">
            <Modal
                showModal={showModal}
                children={modalConfig.content}
                headerName={modalConfig.title}
                toggleModal={toggleModal} />
            {/* Header */}
            <div className="w-full sticky top-0 z-20">
                <div className="w-full h-1/3 z-1 flex flex-col md:flex-row">
                    <div className="flex">
                        <span className="text-9xl"> {groupIcon}</span>
                        <div className="pt-10">
                            <span className="absolute ml-2 mt-1 text-5xl font-semibold z-1 text-green-600"> {groupName}</span>
                            <span className="absolute text-5xl font-bold z-2"> {groupName}</span>
                        </div>
                    </div>
                    <div className="flex gap-5 items-center justify-center h-auto p-4 md:ml-auto md:mr-10 ">
                        <GeneralButton
                            text={"Add Expense"}
                            onClick={handleOpenExpenseModal}
                        />
                        <GeneralButton
                            disabled={true}
                            text={"Add Member"}
                            onClick={handleOpenAddMemberModal} />
                        <GeneralButton
                            disabled={true}
                            text={"Edit Group"}
                            onClick={handleOpenEditGroupModal} />
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    {/* Group Options */}
                    <div className="flex items-center gap-4 bg-orange-500 w-full z-2 py-2 px-2">
                        <NavLink to={"./"}
                            className=" bg-white rounded-xl px-4 py-3 text-black w-fit font-bold"> Transactions </NavLink>
                        <NavLink to={"./members"}
                            className=" bg-white rounded-xl px-4 py-3 text-black w-fit font-bold"> Members </NavLink>
                    </div>
                </div>
            </div>


            {/* Transaction History */}
            <section className="w-11/12 min-h-1/4 border-pink-100 z-0 flex flex-col gap-4 mt-4">
                <Outlet context={transactions} />
            </section>

            {
                showTopBtn && (
                    <button
                        onClick={handleClickUp}
                        className="fixed bottom-26 left-6 md:bottom-3 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full shadow-lg transition">
                        ↑
                    </button>
                )
            }
        </div >

    )
}
