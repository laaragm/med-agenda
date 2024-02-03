import axios, { AxiosError, AxiosInstance } from "axios";

import { acquireToken } from "@/authentication";
import { HttpStatusCodesEnum } from "@/common/models";
import { getFromStorage, isStringNullOrEmpty, isValidToken } from "@/common/utils";

type Headers = { [key: string]: string };

export class ApiClient {
    private isRefreshing = false;
    private failedRequestsQueue: any[] = [];
    private baseURL: string;
    private tokenKey: string;
    private scopes: string[];
    public api: AxiosInstance;
	private headers?: Headers = {};

    constructor(baseURL: string, tokenKey: string, scopes: string[], headers?: Headers) {
		this.baseURL = baseURL;
        this.tokenKey = tokenKey;
        this.scopes = scopes;
		this.headers = headers;
        this.api = this.createApiInstance();
    }

	private createApiInstance() {
        const api = axios.create({
            baseURL: this.baseURL,
            headers: {
				...(!!this.headers && this.headers),
                Authorization: `Bearer ${getFromStorage(this.tokenKey)}`,
            },
        });
        api.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => this.handleError(error)
        );

        return api;
    }

    private retryFailedRequests(accessToken: string) {
        this.failedRequestsQueue.forEach((request) => request.onSuccess(accessToken));
        this.failedRequestsQueue = [];
    }

    private rejectFailedRequests(error: AxiosError) {
        this.failedRequestsQueue.forEach((request) => request.onFailure(error));
        this.failedRequestsQueue = [];
    }

    private async refreshAccessToken(): Promise<string> {
        const authResult = await acquireToken(this.scopes);
        const accessToken = authResult.accessToken;
        this.api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

        return accessToken;
    }

    private async handleTokenRefresh(error: AxiosError) {
        if (this.isRefreshing) return;

        this.isRefreshing = true;
        try {
            const accessToken = await this.refreshAccessToken();
            this.retryFailedRequests(accessToken);
        } catch (e) {
            this.rejectFailedRequests(error);
        } finally {
            this.isRefreshing = false;
        }
    }

    private async handleUnauthorizedRequest(error: AxiosError) {
        const originalConfig = error.config;
        const retryOriginalRequest = new Promise((resolve, reject) => {
            this.failedRequestsQueue.push({
                onSuccess: (accessToken: string) => {
                    if (originalConfig) {
                        originalConfig.headers["Authorization"] = `Bearer ${accessToken}`;
                        resolve(this.createApiInstance()(originalConfig));
                    }
                },
                onFailure: (e: AxiosError) => {
                    reject(e);
                },
            });
        });
        await this.handleTokenRefresh(error);

        return retryOriginalRequest;
    }

    private async handleError(error: AxiosError): Promise<any> {
        const isUnauthorized = error.response?.status === HttpStatusCodesEnum.Unauthorized;
        const token = getFromStorage(this.tokenKey);
        const tokenHasExpired = !isValidToken(token || "");

        if (isUnauthorized && (isStringNullOrEmpty(token) || tokenHasExpired)) {
            return this.handleUnauthorizedRequest(error);
        } else {
            return Promise.reject(error);
        }
    }
}
