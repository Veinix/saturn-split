
interface GeneralButtonProps {
    text: string,
    onClick: (any?: any) => any,
    type?: "submit" | "reset" | "button"
}

export default function GeneralButton({ text, onClick, type = "button" }: GeneralButtonProps) {
    return (
        <button
            type={type}
            className="bg-orange-500 text-white rounded-md p-2 py-4 mt-6 w-1/12 hover:cursor-pointer hover:bg-orange-400 active:bg-orange-600"
            onClick={onClick}>
            {text}
        </button>
    )
}

