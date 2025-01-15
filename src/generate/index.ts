import { GenerateWidgetOutcomingMethods, GenerateWidgetIncomingMethodHandlers, GenerateWidgetProps } from './types';
import createWidget from '../utils/widget';
import { WidgetsSDKOptions } from '../types';

const createGenerateWidget = (options: WidgetsSDKOptions) =>
    createWidget<GenerateWidgetOutcomingMethods, GenerateWidgetIncomingMethodHandlers, GenerateWidgetProps>({
        createOutcomingMethods: (call: (method: string, args: any[]) => Promise<any>) => ({
            getImages: () => call('getImages', []),
            setProps: (props: GenerateWidgetProps) => call('setProps', [props]),
            start: () => call('start', []),
        }),
        options,
        type: 'generate',
    });

export type GenerateWidget = ReturnType<ReturnType<typeof createGenerateWidget>>;
export default createGenerateWidget;
