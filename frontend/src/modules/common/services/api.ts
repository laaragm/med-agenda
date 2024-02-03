import { apiTokenRequest } from "@/authentication";
import { TOKEN_KEY } from "../models";
import { ApiClient } from "./api-client";

const apiClient = new ApiClient(import.meta.env.VITE_API_BASE_URL, TOKEN_KEY.api, apiTokenRequest.scopes, {
	"x-functions-key": import.meta.env.VITE_FUNCTIONS_KEY,
	"Content-Type": "application/json"
});

export const api = apiClient.api;
