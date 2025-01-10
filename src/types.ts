export type WidgetsSDKOptions = {
    authToken: () => string | Promise<string>;
    endpoints?: {
        client?: string;
        widgets?: string;
    };
};
