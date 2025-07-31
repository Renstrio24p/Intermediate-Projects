
const useTiktokSecrets = () => {
    const clientKey = import.meta.env.VITE_CLIENT_KEY;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;

    return { clientKey, clientSecret, redirectUri };
};

export { useTiktokSecrets };