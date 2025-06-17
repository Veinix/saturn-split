import type { ReactNode } from "react"
import { NavLink, type NavLinkRenderProps } from "react-router"

interface NavIconProps {
    href: string
    icon: ReactNode
    label: string,
}
function NavIcon({ href, icon, label }: NavIconProps) {
    return (
        <NavLink to={href}
            
            className={({ isActive, isPending }: NavLinkRenderProps) => [
                isActive
                    ? "bg-neutral-200 md:text-amber-600 hover:bg-amber-600 hover:text-amber-600"
                    : "md:text-neutral-200 md:hover:text-amber-600",
                isPending
                    ? "bg-amber-600 opacity-50"
                    : "hover:bg-neutral-100",
                "border border-neutral-200",
                "flex items-center justify-center h-12 w-12 rounded-md",
                "md:flex-none md:px-6 md:py-4 md:text-base md:font-medium md:w-xs ",
            ].join(" ")}>
            <span className="block md:hidden text-2xl">{icon}</span>
            <span className="hidden md:block">{label}</span>
        </NavLink>
    )
}

export default NavIcon