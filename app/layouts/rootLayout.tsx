import { Outlet } from "react-router";

export default function rootLayout() {
    return (
        <div className=''>
            <main>
                <Outlet />
            </main>
            {/* Navbar */}
            <nav>
            
            </nav>
        </div>
    )
}
