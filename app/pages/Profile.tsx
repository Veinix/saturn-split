import { useNavigate } from 'react-router'
import { useAuth } from '~/Context/authContext'

function profile() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/")
        logout()
    }
    return (
        <div className="flex items-center justify-center h-1/2">
            <button className="w-full h-full mt-20 text-4xl"
                onClick={handleClick}>LOGOUT</button>
        </div>
    )
}

export default profile