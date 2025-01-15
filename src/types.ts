export type WidgetsSDKOptions = {
    authToken: () => string | Promise<string>;
    endpoint?: string;
};

export type WidgetType = 'generate';
