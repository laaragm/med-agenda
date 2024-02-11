import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { IServiceResponse } from "@/common/models";
import { showErrorMessage, showSuccessMessage } from "@/common/utils";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function isStringNullOrEmpty(value: string | null | undefined) {
    return value == null || value === "" || value === undefined;
}

export function handleResponse<T>(response: IServiceResponse<T>, successMessage?: string) {
    if (response.error) {
        showErrorMessage(response.errorMessage);
    } else {
        const defaultMessage = "Operação realizada com sucesso";
        showSuccessMessage(successMessage ? successMessage : defaultMessage);
    }
}

export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
}
