import { useContext } from "react";

import { AuthContext } from "@/common/contexts";

export function useAuth() {
    const data = useContext(AuthContext);

    return data;
}
