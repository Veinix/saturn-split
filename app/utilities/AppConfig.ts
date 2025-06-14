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
    public postmanApiUrl: string = "https://7083e48c-47a1-4bb2-a24b-06d0b9b0c5c7.mock.pstmn.io/api"
    public groupsEndpoint: string = `${this.postmanApiUrl}/api/groups`

    public defaultCurrency = {
        symbol: "₪",
        name: "New Israeli Shekel",
        ticker: "ILS"
    }

    public localStorageJWTKey: string = "jwt_session"
}

const appConfig = new AppConfig()
export default appConfig