import { IPort } from './IPort.js';

/**
 * @abstract
 * Represents the configuration options for a server.
 */
export abstract class IConfig extends IPort {
    SERVER_HOST: string;
    SERVER_PORT: number;
    SERVER_SSL: boolean;
    BODY_SIZE_LIMIT: number | string;
    SERVER_SSL_CERT_PATH: string | undefined;
    SERVER_SSL_PRIVATE_KEY_PATH: string | undefined;
}
