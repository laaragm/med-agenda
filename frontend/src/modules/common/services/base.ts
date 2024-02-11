import axios, { Axios, AxiosInstance, AxiosRequestConfig } from "axios";

import { IServiceResponse } from "@/common/models";
import { api as defaultApi } from "./api";

type RequestParams = {
    route: string;
    defaultErrorMessage: string;
    body?: RequestBody;
    config?: AxiosRequestConfig;
    api?: AxiosInstance;
};

type BaseRequestParams = RequestParams & { httpMethod: HttpMethod };

type HttpMethod = "get" | "post" | "patch" | "delete";

type RequestBody = string | FormData;

export const Get = async <T>(requestParams: RequestParams): Promise<IServiceResponse<T>> => {
    const { route, defaultErrorMessage, config, api } = requestParams;
    const httpMethod: HttpMethod = "get";
    const result = await BaseRequest<T>({ route, defaultErrorMessage, httpMethod, config, api });
    return result;
};

export const Post = async <T>(requestParams: RequestParams): Promise<IServiceResponse<T>> => {
    const { route, defaultErrorMessage, body, config, api } = requestParams;
    const httpMethod: HttpMethod = "post";
    const result = await BaseRequest<T>({ route, defaultErrorMessage, httpMethod, body, config, api });
    return result;
};

export const Patch = async <T>(requestParams: RequestParams): Promise<IServiceResponse<T>> => {
    const { route, defaultErrorMessage, body, config, api } = requestParams;
    const httpMethod: HttpMethod = "patch";
    const result = await BaseRequest<T>({ route, defaultErrorMessage, httpMethod, body, config, api });
    return result;
};

export const Delete = async <T>(requestParams: RequestParams): Promise<IServiceResponse<T>> => {
    const { route, defaultErrorMessage, config, api } = requestParams;
    const httpMethod: HttpMethod = "delete";
    const result = await BaseRequest<T>({ route, defaultErrorMessage, httpMethod, config, api });
    return result;
};

const BaseRequest = async <T>(requestParams: BaseRequestParams): Promise<IServiceResponse<T>> => {
    const { route, defaultErrorMessage, httpMethod, body, config, api } = requestParams;
    const resultFormatted: IServiceResponse<T> = {
        result: null,
        error: false,
        errorMessage: "",
    };

    try {
        const response = await PerformRequest({ httpMethod, defaultErrorMessage, route, body, config, api });
        const requestWasSuccessful = response && response.status >= 200 && response.status < 300;
        if (requestWasSuccessful) {
            resultFormatted.result = response.data;
        } else {
            resultFormatted.error = true;
            resultFormatted.errorMessage = defaultErrorMessage;
        }
    } catch (error) {
        resultFormatted.error = true;
		resultFormatted.errorMessage = getErrorMessageFromError(error, defaultErrorMessage);
    }

    return resultFormatted;
};

const PerformRequest = async (requestParams: BaseRequestParams) => {
    const { route, httpMethod, body, config, api } = requestParams;
    const newApi = !!api ? api : defaultApi;
    switch (httpMethod) {
        case "get": {
            return await newApi.get(route, config);
        }
        case "post": {
            return await newApi.post(route, body, config);
        }
        case "patch": {
            return await newApi.patch(route, body, config);
        }
        case "delete": {
            return await newApi.delete(route, config);
        }
        default: {
            return;
        }
    }
};

const getErrorMessageFromError = (error: unknown, defaultErrorMessage: string) => {
    if (axios.isAxiosError(error)) {
        // Axios error with response data
        if (error.response && error.response.data) {
            if (error.response.data.name) {
                // Server provided 'name' property
                return error.response.data.name;
            } else if (error.response.data.message) {
                // Server provided 'message' property
                return error.response.data.message;
            }
        }
        // Fallback to Axios error message if no detailed server response is found
        return error.message || defaultErrorMessage;
    } else if (error instanceof Error) {
        // Non-Axios error
        return error.message;
    }
    // Default error message if error format is unexpected
    return defaultErrorMessage;
}
