import { type ReactNode } from "react"

interface ModalProps {
    children?: ReactNode,
    headerName?: string,
    showModal?: boolean,
    toggleModal: () => void
}
export default function Modal({ children, headerName, showModal, toggleModal }: ModalProps) {
    if (!showModal) return null;
    return (
        <div className="fixed inset-0 bg-[rgba(65,65,65,0.7)] flex items-center justify-center z-50">
            <main className="w-full md:w-2/3 h-full md:min-h-1/3 md:h-auto bg-amber-700 rounded-lg md:pb-5">
                <header className="w-full pt-2 px-4 flex justify-end">
                    <h2 className={`
                        flex items-center justify-center w-full text-3xl
                        `}
                    > {headerName}</h2>
                    <button className={`
                        bg-gray-500 hover:cursor-pointer border-white border-2 py-1 px-2 w-40 rounded-xl text-white text-4xl font-bold text-center `} onClick={toggleModal}>
                        &times;
                    </button>
                </header>
                <section className="p-4 md:pt-6">
                    {children}
                </section>
            </main>
        </div>
    )
}
