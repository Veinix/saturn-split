import { LanguageOptions } from "./i18n"

class AppConfig {
    public baseUrl: string = `http://localhost:5173/`
    public baseApiEndpoint: string = `https://saturn-split-backend.onrender.com/api`
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

class DevelopmentConfig extends AppConfig {
    public baseUrl: string = "http://localhost:3000/"
    public baseApiEndpoint: string = "http://localhost:3000/api"
    public currentEnvironment: string = "development"
}

class ProductionConfig extends AppConfig {
    public baseUrl: string = "https://saturn-split-backend.onrender.com"
    public baseApiEndpoint: string = "https://saturn-split-backend.onrender.com/api"
    public currentEnvironment: string = "production"
}

const isDevelopment = (!process.env.NODE_ENV || process.env.NODE_ENV) === "development";
const appConfig = isDevelopment ? new DevelopmentConfig() : new ProductionConfig()
export default appConfig