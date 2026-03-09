import { useEffect, useRef, useState } from "react"

export const useDropdownMenu = () => {
    const [isActiveMenu, setIsActiveMenu] = useState(false)

    const menuRef = useRef<HTMLDivElement | null>(null)

    const handleToggleMenu = () => {
        setIsActiveMenu(prev => !prev)
    }
    useEffect(() => {
        const handleOutsideClicks = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsActiveMenu(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClicks);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClicks);
        };
    }, []);


    return {
        menuRef,
        handleToggleMenu,
        isActiveMenu
    }
}