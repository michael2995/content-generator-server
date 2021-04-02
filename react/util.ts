import React from "react"

type StyleDefinitions = Record<string, React.CSSProperties>

export function defineStyles<T extends StyleDefinitions>(styles: T) {
    return styles
}