import { useAuth } from "@app/Hooks/useAuth"
import { useNavigate } from 'react-router'

export default function Profile() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const handleClick = async () => {
        await logout()
        navigate("/")
    }
    return (
        <div className="flex items-center justify-center h-1/2">
            <button className="w-full h-full mt-20 text-4xl"
                onClick={handleClick}>LOGOUT</button>
        </div>
    )
}
