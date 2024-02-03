import { GraphError } from "@/common/models";

export async function GraphService(endpoint: string, accessToken: string): Promise<Blob | null> {
    try {
        const headersAuth = new Headers();
        const bearer = `Bearer ${accessToken}`;

        headersAuth.append("Authorization", bearer);

        const options = {
            method: "GET",
            headers: headersAuth,
        };

        const response = await fetch(endpoint, options);
        if (response.ok) {
            return await response.blob();
        }

        return null;
    } catch (error) {
        throw new GraphError();
    }
}
