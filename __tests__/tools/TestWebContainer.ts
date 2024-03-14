import { Express } from 'express';
import request from 'supertest';

import { DependencyInjection } from '../../src/infrastructure/adapters/DependencyInjection.js';
import { HttpServer } from '../../src/infrastructure/adapters/http-server/HttpServer.js';
import { dependencyMap } from '../../src/infrastructure/DependencyMap.js';
import { repositoryMap } from '../../src/infrastructure/RepositoryMap.js';
import { registerRoutes } from '../../src/interface-adapters/routes/Register.js';

export class TestWebContainer {
    private _api: HttpServer;

    /**
     * @param {DependencyInjection} [dependencyInjection] - Use this parameter if you want to inject test dependencies
     * `repositoryMap`.
     */
    constructor(dependencyInjection: DependencyInjection | undefined = new DependencyInjection(dependencyMap, repositoryMap)) {
        this._api = new HttpServer({
            port: 3001,
            isHttps: false,
            bodySizeLimit: '1mb',
            sslCertPath: undefined,
            sslKeyPath: undefined,
        });
        registerRoutes(this._api, dependencyInjection);
    }

    get request() {
        return request(this._api.getRawServer() as Express);
    }
}
