import React, { useRef} from "react";
import styles from "./Sidebar.module.css";



interface SidebarProps {
    collapsed: boolean;
    isMobile: boolean;
    mobileSidebarOpen: boolean;
    activeItem: string;
    onItemClick: (id: string) => void;
    toggleMobileSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    collapsed,
    isMobile,
    mobileSidebarOpen,
    activeItem,
    onItemClick,
    toggleMobileSidebar,
}) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    //const [contentWidth, setContentWidth] = useState(0) 
    const menuItems = ["home", "about", "skills", "projects", "contact"];

    return (
        <>
            {isMobile && (
                <button
                    className={styles.hamburger}
                    onClick={toggleMobileSidebar}
                    aria-label={mobileSidebarOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileSidebarOpen}
                >
                    {mobileSidebarOpen ? "✕" : "☰"}
                </button>
            )}
        
        
        <div className={`${styles.sidebar} ${isMobile ? styles.mobile : styles.desktop} 
                  ${collapsed ? styles.collapsed : styles.expanded} 
                  ${mobileSidebarOpen ? styles.open : ""}`}
        >
            <div className={styles.panel}>
                <div ref={contentRef} className={styles.content}>
                    <h2 className={`${styles.title} ${collapsed ? styles.titleHidden : ""}`}>
                            Where to?
                    </h2>
                    <ul className={styles.sidebarMenu}>
                        {menuItems.map((item) => (
                            <li key={item}
                            className={activeItem === item ? styles.active: ""}
                            onClick={() => {
                                onItemClick(item);
                                if (!isMobile) toggleMobileSidebar();
                            }}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
};

export default Sidebar;
