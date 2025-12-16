import type { ReactNode } from "react";
import "./Section.css"


interface SelectionProps {
    id: string
    title?: string
    children?: ReactNode
}

export default  function Selection ({id, title, children} : SelectionProps) {
    return (
        <section id={id} className="page-section">
          {title && <h1>{title}</h1>}
          {children}
        </section>

    )
} 
