import { LanguageOptions } from "./i18n"

class AppConfig {
    private testUsername: string = "aviles"
    private testPassword: string = "password"
    private testName: string = "David Aviles"

    public testUser = {
        username: this.testUsername,
        password: this.testPassword,
        name: this.testName,
    }

    public baseUrl: string = "http://localhost:5173/"
    public baseApiEndpoint: string = "http://localhost:3000/api"

    public defaultCurrency = {
        symbol: "₪",
        name: "New Israeli Shekel",
        ticker: "ILS"
    }

    public defaultLanguage = LanguageOptions.English

    public localStorageJWTKey: string = "jwt_session"
}

const appConfig = new AppConfig()
export default appConfig