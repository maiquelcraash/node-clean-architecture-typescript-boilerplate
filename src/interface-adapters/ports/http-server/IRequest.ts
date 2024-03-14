import { IPort } from '../../../domain/ports/IPort.js';

export abstract class IRequest extends IPort {
    /**
     * Retrieves inline URL parameters
     * @abstract
     * @return {object}
     */
    abstract getParams(): object

    /**
     * Returns the body of request
     * @abstract
     * @return {object}
     */
    abstract getBody(): object

    /**
     * Retrieves the query object extracted from request URL
     * @abstract
     * @returns {object} The query object.
     */
    abstract getQuery(): object

    /**
     * Returns the method name.
     * @abstract
     * @return {string} The name of the method.
     */
    abstract getMethod(): string

    /**
     * Retrieves the IP address.
     * @abstract
     * @returns {string} The IP address as a string.
     */
    abstract getIp(): string | undefined
}
