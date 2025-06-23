import { LanguageOptions } from "./i18n"
type FrontendHostType = "localhost" | "192.168.50.156"
type BackendHostType = "localhost" | "192.168.50.156" | "169.254.5.254" | string & {}
class AppConfig {
    private testUsername: string = "aviles"
    private testPassword: string = "password"
    private testName: string = "David Aviles"

    public testUser = {
        username: this.testUsername,
        password: this.testPassword,
        name: this.testName,
    }
    public frontendHost: FrontendHostType = "localhost"
    public baseUrl: string = `http://${this.frontendHost}:5173/`

    public backendHost: BackendHostType = "localhost"
    public baseApiEndpoint: string = `http://${this.backendHost}:3000/api`

    public defaultCurrency = {
        symbol: "₪",
        name: "New Israeli Shekel",
        ticker: "ILS"
    }

    public defaultLanguage = LanguageOptions.English

    public localStorageJWTKey: string = "jwt_session"

    public favoriteColors: { name: string, value: string }[] = [
        { name: "Orange", value: "#FF5733" },
        { name: "Red", value: "#ef4444" },
        { name: "Green", value: "#22c55e" },
        { name: "Blue", value: "#3b82f6" },
        { name: "Purple", value: "#a855f7" },
        { name: "Pink", value: "#ec4899" },
    ];
}

const appConfig = new AppConfig()
export default appConfig