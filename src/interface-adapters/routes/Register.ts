import { factoryUserRouter } from './User.js';
import { IHttpServer } from '../ports/http-server/IHttpServer.js';
import { IDependencyInjection } from '../ports/IDependencyInjection.js';

export function registerRoutes(server: IHttpServer, dependencyInjection: IDependencyInjection): void {
    server.useRouter('/user', factoryUserRouter(dependencyInjection));
}
