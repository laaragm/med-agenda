export class EndpointBuilder {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public build(endpointTemplate: string, params?: { [key: string]: any }): string {
        let endpoint = this.baseUrl + endpointTemplate;
        if (params) {
            endpoint = this.substituteParams(endpoint, params);
        }
        return endpoint;
    }

    private substituteParams(endpoint: string, params: { [key: string]: any }): string {
        for (const key in params) {
            endpoint = endpoint.replace(`{${key}}`, params[key]);
        }
        return endpoint;
    }
}
