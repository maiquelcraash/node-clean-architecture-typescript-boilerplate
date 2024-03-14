import { IAdapter } from '../../domain/ports/IAdapter.js';
import { IConfig } from '../../interface-adapters/ports/IConfig.js';

/**
 * Represents a configuration object.
 *
 * @class
 * @implements {IConfig}
 */
export class Config extends IConfig implements IAdapter {
    static SERVER_HOST = process.env.SERVER_HOST || 'localhost';
    static SERVER_PORT = Number(process.env.SERVER_PORT) || 3000;
    static SERVER_SSL = process.env.SERVER_SSL === 'true';
    static SERVER_SSL_CERT_PATH = undefined;
    static SERVER_SSL_PRIVATE_KEY_PATH = undefined;

    static BODY_SIZE_LIMIT = '50mb';
}
