export class Logger {

    public log(service: string, message: any, error?: Error): void {
        console.log(`[${service}]`, message, error);
    }

    constructor() { }
}
