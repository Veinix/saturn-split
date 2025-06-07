import api from "./Axios"

export async function getTest(): Promise<string> {
    try {
        const res = await api.get("")
        return res.data 
    } catch (error) {
        console.log(error)
        return "error"
    }
}