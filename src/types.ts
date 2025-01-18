export type WidgetsSDKOptions = {
    authToken: () => string | Promise<string>;
    endpoints?: {
        core?: string;
        widgets?: string;
    };
};

export type WidgetType = 'generate';
