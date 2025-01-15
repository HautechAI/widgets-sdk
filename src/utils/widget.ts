import { createRpcCommunication } from '@hautechai/rpc';
import omit from 'lodash.omit';
import { WidgetsSDKOptions } from '../types';
import { WidgetType } from '../types';

const createIframe = (url: string) => {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.height = '100%';
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    return iframe;
};

const createWidget = <WidgetOutcomingMethods, WidgetIncomingMethodHandlers, WidgetProps>(props: {
    createOutcomingMethods: (call: (method: string, args: any[]) => Promise<any>) => WidgetOutcomingMethods;
    options: WidgetsSDKOptions;
    type: WidgetType;
}) => {
    const baseUrl = props.options.endpoint ?? 'https://widgets.hautech.ai';
    const iframeUrl = `${baseUrl}/${props.type}`;
    const iframe = createIframe(iframeUrl);

    let readyCallback: () => void;
    let readyFlag = false;

    const sendMessage = (message: any) => {
        if (!iframe.contentWindow) return;
        iframe.contentWindow.postMessage({ bus: 'hautech', ...message }, '*');
    };

    const defaultIncomingMethodsHandlers = {
        authToken: props.options.authToken,
        ready: () => {
            if (readyFlag) return;

            readyFlag = true;
            if (readyCallback) readyCallback();
        },
    } as any;

    const { handleMessage, outcomingMethods, updateIncomingMethodHandlers } = createRpcCommunication({
        outcomingMethods: (call: (method: string, args: any[]) => Promise<any>) => ({
            ...props.createOutcomingMethods(call),
            setProps: (props: WidgetProps) => call('setProps', [props]),
        }),
        sendMessage,
    });
    const listener = (event: any) => {
        if (event.data.bus !== 'hautech') return;
        handleMessage(event.data);
    };

    const attach = (container: HTMLElement) => {
        if (!container) throw new Error('Container is required');

        container.appendChild(iframe);
        window.addEventListener('message', listener);
    };
    const detach = () => {
        try {
            iframe.parentNode?.removeChild(iframe);
            window.removeEventListener('message', listener);
            readyFlag = false;
        } catch {}
    };
    const ready = async () =>
        new Promise<void>((resolve) => {
            if (readyFlag) return resolve();
            readyCallback = () => resolve();
        });

    const setProps = async (props: WidgetProps) => {
        await outcomingMethods.setProps(props);
    };

    return () => ({
        attach,
        detach,
        methods: omit(outcomingMethods, 'setProps'),
        ready,
        setHandlers: (incomingMethodsHandlers: WidgetIncomingMethodHandlers) =>
            updateIncomingMethodHandlers({
                ...incomingMethodsHandlers,
                ...defaultIncomingMethodsHandlers,
            }),
        setProps,
    });
};

export default createWidget;
