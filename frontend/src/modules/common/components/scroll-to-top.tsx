import { useEffect } from "react";

export function ScrollToTop() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }
    }, [window.location.pathname]);

    return null;
}
