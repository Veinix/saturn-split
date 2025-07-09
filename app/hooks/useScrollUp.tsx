import React, { useEffect, useState } from 'react'

function useScrollUp(tolerance: number) {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        function onScroll() {
            setShowTopBtn(window.scrollY > tolerance);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return { showTopBtn, scrollToTop }
}

export default useScrollUp