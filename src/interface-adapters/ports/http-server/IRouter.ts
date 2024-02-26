import { IRequest } from './IRequest.js';
import { IResponse } from './IResponse.js';
import { IPort } from '../IPort.js';

export type IRouteCallback = (req: IRequest, res: IResponse, next: (err: unknown) => void) => Promise<void>;
export type IRouteErrorCallback = (err: Error, req: IRequest, res: IResponse, next: () => void) => void;
export type IRouteMiddleware = (req: IRequest, res: IResponse, next: (err: unknown) => void) => Promise<void>;

export abstract class IRouter extends IPort {
    /**
     * Assign a router to a specific path.
     * @abstract
     * @param {string} path - The path to associate the router with.
     * @param {IRouter} router - The router to be assigned to the path.
     * @returns {void}
     */
    abstract useRouter(path: string, router: IRouter): void;

    /**
     * Applies middleware to the route.
     * @abstract
     * @param {IRouteMiddleware} middleware - The middleware function to be applied.
     * @return {void}
     */
    abstract useMiddleware(middleware: IRouteMiddleware): void;

    /**
     * Apply callback to request for the path considering all HTTP verbs
     * @abstract
     * @param {string} path
     * @param {IRouteCallback} callback
     * @return {void}
     */
    abstract all(path: string, callback: IRouteCallback): void;

    /**
     * Apply callback to request for the path considering GET HTTP verb
     * @abstract
     * @param {string} path
     * @param {IRouteCallback} callback
     * @return {void}
     */
    abstract get(path: string, callback: IRouteCallback): void;

    /**
     * Apply callback to request for the path considering PATCH HTTP verb
     * @abstract
     * @param {string} path
     * @param {IRouteCallback} callback
     * @return {void}
     */
    abstract patch(path: string, callback: IRouteCallback): void;

    /**
     * Apply callback to request for the path considering PUT HTTP verb
     * @abstract
     * @param {string} path
     * @param {IRouteCallback} callback
     * @return {void}
     */
    abstract put(path: string, callback: IRouteCallback): void;

    /**
     * Apply callback to request for the path considering POST HTTP verb
     * @abstract
     * @param {string} path
     * @param {IRouteCallback} callback
     * @return {void}
     */
    abstract post(path: string, callback: IRouteCallback): void;

    /**
     * Apply callback to request for the path considering DELETE HTTP verb
     * @abstract
     * @param {string} path
     * @param {IRouteCallback} callback
     * @return {void}
     */
    abstract delete(path: string, callback: IRouteCallback): void;

    /**
     * Retrieves the raw router object.
     *
     * @returns {unknown} The raw router object.
     */
    abstract getRawRouter(): unknown;
}
