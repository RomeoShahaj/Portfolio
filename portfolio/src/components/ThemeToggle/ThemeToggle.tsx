import { useEffect, useState } from "react";

export default function ThemeToggle() {

    const [dark, setDark] =useState(
        () => window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [dark]);



    return (
        <button onClick={() => setDark(!dark)}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-800 roundend-lg transition"
        >
            {dark ? "Light Mode" : "Dark Mode"}
        </button>
        
    );
}
