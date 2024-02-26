import { factoryUserController } from '../factories/UserControllerFactory.js';
import { IRouter } from '../ports/http-server/IRouter.js';
import { IDependencyInjection } from '../ports/IDependencyInjection.js';

export function factoryUserRouter(dependencyInjection: IDependencyInjection): IRouter {
    const Router = dependencyInjection.resolveAdapterConstructor<IRouter>(IRouter);
    const userRouter = new Router();

    const userController = factoryUserController(dependencyInjection);

    userRouter.get('/', userController.getAllUsers.bind(userController));

    return userRouter;
}
