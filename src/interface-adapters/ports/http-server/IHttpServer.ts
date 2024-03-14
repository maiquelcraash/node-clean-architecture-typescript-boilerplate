import { IRouteCallback, IRouteErrorCallback, IRouter } from './IRouter.js';
import { IPort } from '../../../domain/ports/IPort.js';

export abstract class IHttpServer extends IPort {
    /**
     * Applies a plugin or middleware to especific endpoint from server
     * @abstract
     * @param {string} endpointExpression
     * @param {IRouteCallback} callback
     * @returns {void}
     */
    abstract use(endpointExpression: string, callback: IRouteCallback): void;

    /**
     * Applies the error middleware to handle errors in the route.
     * @abstract
     * @param {IRouteErrorCallback} errorCallback - The error callback function to handle errors.
     * @return {void}
     */
    abstract useErrorMiddleware(errorCallback: IRouteErrorCallback): void;

    /**
     * Abstract method to use router with a given endpoint expression.
     * @abstract
     * @param {string} endpointExpression - The expression to define the endpoint.
     * @param {IRouter} router - The router object to be used.
     * @returns {void}
     */
    abstract useRouter(endpointExpression: string, router: IRouter): void;

    /**
     * Starts the webserver.
     * @abstract
     * @returns {void}
     */
    abstract start(): void;

    /**
     * Returns true when Server is SSL/HTTPs
     * @abstract
     * @returns {void}
     */
    abstract isHttps(): boolean;

    /**
     * Returns the raw server instance from the external library you have chosen, Eg: Express app
     * @abstract
     * @returns {unknown} The raw server app
     */
    abstract getRawServer(): unknown;
}
