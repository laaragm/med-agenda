import { toast } from "react-toastify";

export function showSuccessMessage(message: string) {
    toast.success(message);
}

export function showErrorMessage(message: string) {
    toast.error(message);
}

export function showInfoMessage(message: string) {
    toast.info(message);
}

export function showWarningMessage(message: string) {
    toast.warning(message);
}
