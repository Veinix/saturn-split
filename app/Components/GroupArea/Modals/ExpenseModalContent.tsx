import type { Route } from ".react-router/types/app/Pages/Groups/+types/OpenedGroup";
import groupsService from "@app/Services/GroupsService";
import { data, redirect, useFetcher } from "react-router";

type SelectExpenseCategoryProps = {
    categoryOptions: {
        household: string;
        groceries: string;
        rent: string;
        utilities?: string;
        entertainment?: string;
        other?: string;
    }
}
const headerTextColor = "text-orange-600 "
const textColor = "text-amber-600 "
const SelectExpenseCategory = ({ categoryOptions }: SelectExpenseCategoryProps) => {
    return (
        <div className="w-full md:w-1/3">
            <label
                htmlFor="expenseCategory"
                className={`${headerTextColor} text-lg`}>
                Category
            </label>

            <select
                id="expenseCategory"
                name="expenseCategory"
                className={textColor + " w-full border border-gray-300 rounded p-2"}>
                <option value={categoryOptions.household}
                    className="bg-gray-600">{categoryOptions.household}</option>
                <option value={categoryOptions.groceries}
                    className="bg-gray-600">{categoryOptions.groceries}</option>
                <option value={categoryOptions.rent}
                    className="bg-gray-600">{categoryOptions.rent}</option>
            </select>
        </div>
    )

}



const ExpenseNameInput = () => {
    return (
        <div className="w-full">
            <label
                htmlFor="expenseName"
                className={headerTextColor + "text-lg"}>
                Expense Name
            </label>
            <input
                id="expenseName"
                name="expenseName"
                type="text"
                className={textColor + "w-full p-2 border border-gray-300 rounded "} />
        </div>
    )
}

const ExpenseAmountInput = () => {
    return (
        <div className="w-full flex flex-col flex-1  ">
            <label
                htmlFor="expenseAmount"
                className={headerTextColor + "text-lg"}>
                Amount
            </label>
            <input
                id="expenseAmount"
                name="expenseAmount"
                placeholder="0.00"
                type="number"
                className={textColor + "w-full px-3 py-2 h-10 border border-gray-300 rounded"} />
        </div>
    )
}
const SelectSplitType = ({ splitOptions }: { splitOptions: { equally: string; unequally: string } }) => {
    return (
        <div className="w-full flex flex-col flex-1 md:w-1/3  ">
            <label
                htmlFor="expenseSplit"
                className={headerTextColor + "text-lg "}>
                Split
            </label>
            <select
                id="expenseSplit"
                name="expenseSplit"
                className={
                    textColor +
                    "w-full px-3 py-2 h-10 border border-gray-300 rounded bg-none " +
                    "[&>option]:p-2 " +
                    "[&>option]:text-gray-800 " +
                    "[&>option]:bg-none " +
                    "[&>option:hover]:bg-gray-100"
                }>
                <option
                    value={splitOptions.equally}
                    className=" ">{splitOptions.equally}</option>
                <option
                    disabled
                    value={splitOptions.unequally}
                    className=" ">{splitOptions.unequally}</option>
            </select>
        </div>
    )
}

const ExpenseDescriptionInput = () => {
    return (
        <div className="w-full ">
            <label
                htmlFor="expenseDescription"
                className={headerTextColor + " text-lg"}>
                Description
            </label>
            <textarea
                id="expenseDescription"
                name="expenseDescription"
                rows={3}
                className={textColor + "w-full p-2 border border-gray-300 rounded md:h-1/2 resize-none overflow-y-auto"} />
        </div>
    )
}

export default function ExpenseModalContent() {
    const fetcher = useFetcher()

    const categoryOptions = {
        household: "Household",
        groceries: "Groceries",
        rent: "Rent",
        utilities: "Utilities",
        entertainment: "Entertainment",
        other: "Other"
    }

    const splitOptions = {
        equally: "Equally",
        unequally: "Unequally",
    }

    return (
        <>
            <fetcher.Form className="flex flex-col gap-4 ">
                <main className="flex flex-col md:flex-row gap-2 md:gap-4 md:w-2/3">
                    <ExpenseNameInput />
                    <SelectExpenseCategory
                        categoryOptions={categoryOptions}
                    />
                    <div className="flex gap-4 items-stretch w-full">
                        <SelectSplitType splitOptions={splitOptions} />
                        <ExpenseAmountInput />
                    </div>
                    <ExpenseDescriptionInput />
                </main>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors md:w-1/4">
                    Add Expense
                </button>
            </fetcher.Form>
        </ >
    )
}

export async function clientAction({
    request,
}: Route.ActionArgs) {
    const formData = await request.formData()

    const expenseCategory = String(formData.get("expenseCategory"))
    const expenseName = String(formData.get("expenseName"))
    const expenseSplit = String(formData.get("expenseSplit"))
    const expenseDescription = String(formData.get("expenseDescription"))
    const expenseAmount = Number(formData.get("expenseAmount"))

    const errors: Record<string, string> = {}

    if (!expenseCategory) {
        errors.expenseCategory = "Category is required"
    }

    if (!expenseName) {
        errors.expenseName = "Expenses require names"
    } else if (expenseName.length < 3) {
        errors.expenseName = "Expense Name must be at least 3 characters long"
    }

    if (!expenseSplit) {
        errors.expenseSplit = "Split is required"
    }

    if (!expenseAmount) {
        errors.expenseAmount = "Amount is required"
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }

    const res = await groupsService.addExpense({
        lenderId: "string",
        expenseName: expenseName,
        borrowers: [],
        amount: expenseAmount,
        transactionDate: "",
    });
    if (!res) {
        return data("Failed to add expense", { status: 500 });
    } else {
        console.log(res)
    }

    return redirect("/")

}
