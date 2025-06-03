import axios from "axios"
import { appConfig } from "~/utilities/AppConfig"

export async function groupsLoader() {
    const res = await axios.get(appConfig.groupsEndpoint)
    return res.data
}
