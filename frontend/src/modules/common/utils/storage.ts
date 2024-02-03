export const saveInStorage = (key: string, token: string) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem(key, token);
    }
};

export const removeFromStorage = (key: string) => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem(key);
    }
};

export const getFromStorage = (key: string) => {
    if (typeof window !== "undefined") {
        return sessionStorage.getItem(key);
    }
};
