import client from './client';
import widgets from './widgets';
import { WidgetsSDKOptions } from './types';

export const createWidgetsSDK = (options: WidgetsSDKOptions) => ({
    client: client(options),
    widgets: widgets(options),
});

export type WidgetsSDK = ReturnType<typeof createWidgetsSDK>;
