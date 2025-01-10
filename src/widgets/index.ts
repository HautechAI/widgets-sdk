import generate from './generate';
import { WidgetsSDKOptions } from '../types';

const WidgetsModule = (options: WidgetsSDKOptions) => ({ generate: generate(options) });

export default WidgetsModule;
