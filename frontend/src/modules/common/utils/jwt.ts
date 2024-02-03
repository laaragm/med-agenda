
import { jwtDecode } from "jwt-decode";
import { isStringNullOrEmpty } from "./functions";

const isValidToken = (accessToken: string) => {
    if (isStringNullOrEmpty(accessToken)) {
        return false;
    }
    const decoded = jwtDecode<{ exp: number }>(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};

export { isValidToken };
