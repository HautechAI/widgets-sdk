import { createClientSDK } from '@hautechai/client';
import { WidgetsSDKOptions } from '../types';

const ClientModule = (options: WidgetsSDKOptions) =>
    createClientSDK({ authToken: options.authToken, endpoint: options.endpoints?.client });

export default ClientModule;
