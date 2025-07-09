import { useState, type ReactNode } from 'react'


export interface ModalConfig {
    title: string;
    content: ReactNode;
}
type UseModalReturn = [
    boolean,
    () => void,
    ModalConfig,
    (config: ModalConfig) => void
]
function useModal(): UseModalReturn {
    const [showModal, setShowModal] = useState(false)
    const [modalConfig, setModalConfig] = useState<ModalConfig>({ title: "No Title", content: null })
    const toggleModal = () => {
        setShowModal(prev => !prev)
    }
    const updateModalContent = (config: ModalConfig) => {
        setModalConfig(config)
    }

    return [showModal, toggleModal, modalConfig, updateModalContent]
}

export default useModal