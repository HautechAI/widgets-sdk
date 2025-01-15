import generate from './generate';
import { WidgetsSDKOptions } from './types';

export const createWidgetsSDK = (options: WidgetsSDKOptions) => ({
    generate: {
        v1: generate(options),
    },
});

export type WidgetsSDK = ReturnType<typeof createWidgetsSDK>;
