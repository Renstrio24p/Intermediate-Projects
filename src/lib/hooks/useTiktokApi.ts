
type TiktokApiProps = (
    code: string,
    client_key: string,
    client_secret: string,
    redirect_uri: string,
) => Promise<Object>;



export const useTiktokApi: TiktokApiProps = async (code, client_key, client_secret, redirect_uri): Promise<Object> => {
    const endpoint = "https://open.tiktokapis.com/v2/oauth/token/";

    const body = new URLSearchParams({
        code,
        client_key,
        client_secret,
        redirect_uri,
        grant_type: "authorization_code",
    });

    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`Failed to get TikTok access token: ${error}`);
        }

        const data = await res.json();
        return data;
    } catch (err) {
        return { error: (err as Error).message };
    }
}
