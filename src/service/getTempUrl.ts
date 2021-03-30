import { saveTemp } from "./saveTemp"

export const getTempUrl = async (...args: Parameters<typeof saveTemp>) => {
    const filename = await saveTemp(...args)
    return `${process.env.SERVER_ENDPOINT}:${process.env.PORT}/file?name=${filename}`
}