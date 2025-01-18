import { createSDK } from '@hautechai/sdk';
import generate from './generate';
import { WidgetsSDKOptions } from './types';

export const createWidgetsSDK = (options: WidgetsSDKOptions) => ({
    core: createSDK({ authToken: options.authToken, endpoint: options.endpoints?.core }),
    widgets: {
        generate: {
            v1: generate(options),
        },
    },
});

export type WidgetsSDK = ReturnType<typeof createWidgetsSDK>;
