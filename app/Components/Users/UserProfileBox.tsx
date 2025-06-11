
interface IUserProfileBox extends Profile {
}

export default function UserProfileBox({ id, name, role }: IUserProfileBox) {
    const { user, login, logout } = useAuth()
    const handleClick = () => {
        login({ id, name, role })
    }
    const color = () => {
        switch (name) {
            case "David Aviles":
                return "bg-orange-500"
            case "Omer Nussboim":
                return "bg-green-500";
            case "Eran Farkash":
            default:
                return "bg-blue-500"
        }
    }
    return (
        <button className={`w-3xs h-28 hover:cursor-pointer flex items-center  justify-center ${color()} font-bold text-2xl`} onClick={handleClick} > {name.split(" ")[0]} </button>
    )
}
