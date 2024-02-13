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

export function formatDate(date: string) {
	const value = new Date(date);
	const day = value.getDate().toString().padStart(2, '0');
	const month = (value.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
	const year = value.getFullYear();

	return `${day}/${month}/${year}`;
  }
