import ReactDomServer from "react-dom/server"
import { html2png } from "./html2png"

export const element2png = async (element: JSX.Element) => {
    const markup = ReactDomServer.renderToStaticMarkup(element)
    const buffer = await html2png(markup)
    return buffer
}