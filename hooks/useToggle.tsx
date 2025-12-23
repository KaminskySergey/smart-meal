import { useState } from "react";

export function useToggle() {
    const [isToggle, setIsToggle] = useState(false)
    const handleToggle = () => {
        setIsToggle(prev => !prev)
    }

    return {
        handleToggle,
        isToggle
    }
}