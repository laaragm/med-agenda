export interface IServiceResponse<T> {
    result: T | null;
    error: boolean;
    errorMessage: string;
}
