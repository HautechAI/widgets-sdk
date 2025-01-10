import { GenerateOperationInput } from '@hautechai/client';

export type GenerateWidgetIncomingMethodHandlers = {
    downloadImage: (data: { imageId: string }) => Promise<void>;
};

export type GenerateWidgetButton = {
    text?: string;
    visible?: boolean;
};

export type GenerateWidgetProps = {
    buttons?: {
        download?: GenerateWidgetButton;
        retouch?: GenerateWidgetButton;
        upscale?: GenerateWidgetButton;
    };
    collectionId: string;
    input: Partial<GenerateOperationInput> & { productImageId: string };
};

export type GenerateWidgetOutcomingMethods = {
    getImages: () => Promise<string[]>;
    setProps: (props: GenerateWidgetProps) => Promise<void>;
    start: () => Promise<void>;
};
