import { URL } from 'node:url';

import { IPort } from '../IPort.js';

export abstract class IResponse extends IPort {
    /**
     * Converts data into JSON format and send request.
     * @abstract
     * @param {object} data - The data object to be converted to JSON and sent.
     * @return {IResponse} - Self
     */
    abstract json(data: object): IResponse

    /**
     * Redirects to a specified URL with the provided HTTP status code.
     * @abstract
     * @param {string|URL} url - The URL to redirect to.
     * @param {number} code - The HTTP status code to use for redirection.
     * @returns {void}
     */
    abstract redirect(url: string | URL, code: number): void

    /**
     * Sets a header with the given key and value.
     * @abstract
     * @param {string} key - The key of the header.
     * @param {string} value - The value of the header.
     * @return {IResponse} - Self
     */
    abstract setHeader(key: string, value: string): IResponse

    /**
     * Sets the content type of the response.
     * @abstract
     * @param {string} value - The value representing the content type.
     * @return {IResponse} - Self
     */
    abstract setContentType(value: string): IResponse

    /**
     * Sets the status of the response based on the given HTTP code.
     * @abstract
     * @param {number} code - The code representing the response status.
     * @returns {IResponse} - Self
     */
    abstract status(code: number): IResponse

    /**
     * Ends the connection with client
     * @abstract
     * @return {IResponse} - Self
     */
    abstract end(): IResponse

    /**
     * Sends the specified content.
     * @abstract
     * @param {unknown} content - The content to be sent.
     * @return {IResponse} - The response received after sending the content.
     */
    abstract send(content: unknown): IResponse
}
