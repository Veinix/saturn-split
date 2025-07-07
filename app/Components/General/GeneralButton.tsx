
interface GeneralButtonProps {
    text: string,
    onClick?: (any?: any) => any,
    type?: "submit" | "reset" | "button",
    margin?: string,
    disabled?: boolean,
}

export default function GeneralButton({ text, onClick, type = "button", margin, disabled }: GeneralButtonProps) {
    const disabledStyling = "bg-gray-700 text-gray-400 hover:cursor-not-allowed border border-gray-400"
    const enabledStyling = `bg-orange-500 text-gray-100 hover:cursor-pointer hover:bg-amber-700 active:bg-orange-400`
    const loadingStyling = ""
    const baseStyling = ` rounded-md p-2 py-4 min-w-1/6 md:w-40  ${margin}`
    return (
        <button
            disabled={disabled ?? false}
            type={type}
            className={(disabled ? disabledStyling : enabledStyling) + baseStyling}
            onClick={onClick}>
            {text}
        </button>
    )
}

