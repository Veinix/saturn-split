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
const SelectExpenseCategory = ({ categoryOptions }: SelectExpenseCategoryProps) => {
    return (
        <div className="w-full md:w-1/3">
            <label
                htmlFor="expenseCategory"
                className="block text-lg  mb-1">
                Category
            </label>

            <select
                id="expenseCategory"
                className="w-full border border-gray-300 rounded p-2">
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

const SelectSplitType = ({ splitOptions }: { splitOptions: { equally: string; unequally: string } }) => {
    return (
        <div className="w-full md:w-1/3">
            <label
                htmlFor="expenseSplit"
                className="block text-lg font-medium ">Split</label>
            <select
                id="expenseSplit"
                className="w-full border border-gray-300 rounded p-2">
                <option
                    value={splitOptions.equally}
                    className="bg-gray-600">{splitOptions.equally}</option>
                <option
                    value={splitOptions.unequally}
                    className="bg-gray-600">{splitOptions.unequally}</option>
            </select>
        </div>
    )
}

const ExpenseNameInput = () => {
    return (
        <div className="w-full">
            <label
                htmlFor="expenseName"
                className="text-lg mb-1 md:mb-0 w-full flex items-center">
                Expense Name
            </label>
            <input
                id="expenseName"
                type="text"
                className="w-full p-2 border border-gray-300 rounded " />
        </div>
    )
}

const ExpenseAmountInput = () => {
    return (
        <div className="w-full">
            <label
                htmlFor="expenseAmount"
                className="text-lg mb-1 md:mb-0  flex items-center">
                Amount
            </label>
            <input
                id="expenseAmount"
                placeholder="0.00"
                type="number"
                className="w-full p-2 border border-gray-300 rounded   " />
        </div>
    )
}

const ExpenseDescriptionInput = () => {
    return (
        <div className="w-full ">
            <label
                htmlFor="expenseDescription"
                className="text-lg mb-1 flex items-center">
                Description
            </label>
            <textarea
                id="expenseDescription"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded md:h-1/2 resize-none overflow-y-auto" />
        </div>
    )
}

export default function ExpenseModalContent() {
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
            <form className="flex flex-col gap-4 ">
                <main className="md:flex md:flex-row md:gap-4">
                    <section className="md:w-2/3 md:flex md:flex-col md:gap-2">
                        <div className="flex flex-col gap-4 md:flex-row md:w-full md:items-center">
                            <ExpenseNameInput />
                            <SelectExpenseCategory
                                categoryOptions={categoryOptions}
                            />
                        </div>
                        <div className="flex flex-col gap-4 md:flex-row md:w-full md:items-center">
                            <SelectSplitType splitOptions={splitOptions} />
                            <ExpenseAmountInput />
                        </div>
                        <ExpenseDescriptionInput />
                    </section>
                    {/* <div className="border-l-2 border-gray-950 hidden md:flex p-4">
                        Example
                    </div> */}
                </main>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors md:w-1/4">
                    Add Expense
                </button>
            </form>
        </ >
    )
}

