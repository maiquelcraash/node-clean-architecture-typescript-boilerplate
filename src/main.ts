import { DependencyInjection } from './infrastructure/adapters/DependencyInjection.js';
import { HttpServer, HttpServerOptions } from './infrastructure/adapters/http-server/HttpServer.js';
import { dependencyMap } from './infrastructure/DependencyMap.js';
import { repositoryMap } from './infrastructure/RepositoryMap.js';
import { IConfig } from './interface-adapters/ports/IConfig.js';
import { registerRoutes} from './interface-adapters/routes/Register.js';

const dependencyInjection = new DependencyInjection(dependencyMap, repositoryMap);
const Config = dependencyInjection.resolveAdapterStatic<IConfig>(IConfig);

function startServer(): void {
    const serverOptions: HttpServerOptions = {
        port: Config.SERVER_PORT,
        bodySizeLimit: Config.BODY_SIZE_LIMIT,
        sslKeyPath: Config.SERVER_SSL_PRIVATE_KEY_PATH,
        sslCertPath: Config.SERVER_SSL_CERT_PATH,
        isHttps: Config.SERVER_SSL
    }

    const api = new HttpServer(serverOptions);
    registerRoutes(api, dependencyInjection);
    api.start();
}

startServer();
