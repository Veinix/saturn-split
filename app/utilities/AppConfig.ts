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
    public postmanApiUrl: string = "https://5030a842-97cb-4e54-a2a6-cfcb04ad3323.mock.pstmn.io"
    public groupsEndpoint: string = `${this.postmanApiUrl}/api/groups`
}

export const appConfig = new AppConfig()