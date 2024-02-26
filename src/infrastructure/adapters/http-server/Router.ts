import express from 'express';

import { Request } from './Request.js';
import { Response } from './Response.js';
import { IRouteCallback, IRouteMiddleware, IRouter } from '../../../interface-adapters/ports/http-server/IRouter.js';

export class Router extends IRouter {
    private _rawRouter: express.Router;

    constructor() {
        super();
        // eslint-disable-next-line import/no-named-as-default-member
        this._rawRouter = express.Router();
    }

    useRouter(path: string, router: IRouter) {
        this._rawRouter.use(path, router.getRawRouter() as express.Router);
    }

    useMiddleware(middleware: IRouteMiddleware) {
        this._rawRouter.use(this._adaptMiddleware(middleware));
    }

    getRawRouter(): unknown {
        return this._rawRouter;
    }

    all(path: string, callback: IRouteCallback) {
        this._rawRouter.all(path, this._adaptMiddleware(callback));
    }

    get(path: string, callback: IRouteCallback) {
        this._rawRouter.get(path, this._adaptMiddleware(callback));
    }

    patch(path: string, callback: IRouteCallback) {
        this._rawRouter.patch(path, this._adaptMiddleware(callback));
    }

    put(path: string, callback: IRouteCallback) {
        this._rawRouter.put(path, this._adaptMiddleware(callback));
    }

    post(path: string, callback: IRouteCallback) {
        this._rawRouter.post(path, this._adaptMiddleware(callback));
    }

    delete(path: string, callback: IRouteCallback) {
        this._rawRouter.delete(path, this._adaptMiddleware(callback));
    }

    private _adaptMiddleware(callback: IRouteMiddleware) {
        return async (req: express.Request, res: express.Response, next: (err: unknown) => never) => {
            try {
                await callback(new Request(req), new Response(res), next);
            } catch (err: unknown) {
                next(err);
            }
        };
    }
}
