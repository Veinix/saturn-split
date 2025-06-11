
function Login() {
    return (
        <div>
            <p className="pb-3"> Input your username and password to login</p>
            <input className="bg-gray border border-gray-300 rounded-md p-2 w-full" placeholder="Username" />
            <input type="password" className="bg-gray border border-gray-300 rounded-md p-2 w-full mt-3" placeholder="Password" />
            <button className="bg-orange-500 text-white rounded-md p-2 mt-3 w-full">
                Login
            </button>
        </div>
    )
}

export default Login