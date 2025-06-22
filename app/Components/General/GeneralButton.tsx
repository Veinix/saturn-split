
interface GeneralButtonProps {
    text: string,
    onClick?: (any?: any) => any,
    type?: "submit" | "reset" | "button",
    margin?: string,
}

export default function GeneralButton({ text, onClick, type = "button", margin }: GeneralButtonProps) {
    return (
        <button
            type={type}
            className={`bg-orange-500 text-gray-100 rounded-md p-2 py-4 w-1/12 hover:cursor-pointer hover:bg-amber-700 active:bg-orange-400 ${margin}`}
            onClick={onClick}>
            {text}
        </button>
    )
}

