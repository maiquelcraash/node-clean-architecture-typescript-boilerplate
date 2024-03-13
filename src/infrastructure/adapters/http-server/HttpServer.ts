import fs from 'fs';
import http from 'http';
import https from 'https';

import bodyParser from 'body-parser';
import express from 'express';

import { Request } from './Request.js';
import { Response } from './Response.js';
import { IHttpServer } from '../../../interface-adapters/ports/http-server/IHttpServer.js';
import { IRouteCallback, IRouteErrorCallback, IRouter } from '../../../interface-adapters/ports/http-server/IRouter.js';

export interface HttpServerOptions {
    port: number,
    isHttps: boolean,
    sslKeyPath: string | undefined,
    sslCertPath: string | undefined,
    bodySizeLimit: string | number
}

export class HttpServer extends IHttpServer {
    private _app: express.Express;
    private _config: HttpServerOptions;
    private _nodeServer: http.Server | https.Server;
    private _isStarted: boolean;
    private _isHttps: boolean;

    constructor(config: HttpServerOptions) {
        super();
        this._isStarted = false;
        this._isHttps = false;
        this._config = config;
        this._app = express();
        this._initiateMiddlewares();

        this._nodeServer = this._factoryHttpServer();
    }

    private _initiateMiddlewares(): void {
        this._app.use(bodyParser.json({ limit: this._config.bodySizeLimit }));
        this._app.use(bodyParser.urlencoded({ extended: true }));
    }

    private _factoryHttpServer(): http.Server | https.Server {
        if (this._config.isHttps && this._config.sslKeyPath && this._config.sslCertPath) {
            const httpsOptions = {
                key: fs.readFileSync(this._config.sslKeyPath),
                cert: fs.readFileSync(this._config.sslCertPath),
            };
            this._isHttps = true;
            return https.createServer(httpsOptions, this._app);
        }

        return http.createServer(this._app);
    }

    start() {
        this._isStarted = true;
        this._nodeServer.listen(this._config.port, () => {
            console.info(`Started ${this.isHttps() ? 'HTTPS' : 'HTTP'} server port`, this._config.port);
        });
    }

    isHttps(): boolean {
        return this._isStarted && this._isHttps
    }

    use(endpointExpression: string, callback: IRouteCallback): void {
        this._app.use(endpointExpression, async (req, res, next) => {
            await callback(new Request(req), new Response(res), next);
        });
    }

    useErrorMiddleware(errorCallback: IRouteErrorCallback): void {
        this._app.use((err: Error, req: express.Request, res: express.Response, next: () => void) => {
            errorCallback(err, new Request(req), new Response(res), next);
        });
    }

    useRouter(endpointExpression: string, router: IRouter): void {
        this._app.use(endpointExpression, router.getRawRouter() as express.IRouter);
    }
}
