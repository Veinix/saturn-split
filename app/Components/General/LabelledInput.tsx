import type { ReactNode } from "react"

type LabelledInputProps =
    {
        children?: ReactNode,
        label: string,
        name?: string,
        type?: string
    }


export default function LabelledInput({ children, label, name, type = "text" }: LabelledInputProps
) {
    return (
        <div className="">
            <p className="pb-1">{label}</p>
            {children
                ? children
                : <input
                    className="bg-gray border border-gray-300 rounded-md p-3 w-full  focus:border-black focus:outline-solid focus:outline-amber-700" type={type} name={name} />
            }
        </div>
    )
}
