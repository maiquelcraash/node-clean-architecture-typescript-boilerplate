import { IRouter } from '../ports/http-server/IRouter.js';
import { IDependencyInjection } from '../ports/IDependencyInjection.js';

export function factoryUserRouter(dependencyInjection: IDependencyInjection): IRouter {
    const Router = dependencyInjection.resolveConstructor<IRouter>(IRouter);
    const userRouter = new Router();

    userRouter.get('/', async (_req, res) => {
        res.send('ok').end();
    });

    return userRouter;
}
