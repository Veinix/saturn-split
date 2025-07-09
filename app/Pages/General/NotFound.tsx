import React from 'react'
import { useNavigate } from "react-router";

export default function NotFound() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-center">404</h1>
            <h1 className="text-4xl font-bold text-center">WOOPSIE DOOPSIE NOT FOUND</h1>
            <p className="text-center mt-4">The page you are looking for does not exist.</p>
            <div>
                <span className="text-center mt-2"> Please check the URL or </span>
                <span className="inline border-b text-blue-600 hover:text-blue-500 hover:cursor-pointer"
                    onClick={handleClick}> return to the home page.
                </span>
            </div>
        </div>
    )
}

