import { GetAllUsersUseCase } from '../../../../src/domain/use-cases/GetAllUsersUseCase.js';
import { UserController } from '../../../../src/interface-adapters/controllers/UserController.js';
import { factoryUserController } from '../../../../src/interface-adapters/factories/UserControllerFactory.js';
import { IDependencyInjection } from '../../../../src/interface-adapters/ports/IDependencyInjection.js';
import { UserPresenter } from '../../../../src/interface-adapters/presenters/UserPresenter.js';

describe('interface-adapters > factories > UserControllerFactory', () => {
    let dependencyInjectionMock: unknown;

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        dependencyInjectionMock = {
            resolveRepository: jest.fn().mockReturnValue('user-repo-adapter-mock'),
        };
    });

    describe('When asking for a UserController instance', () => {
        test('then should return correct UserController instance', () => {
            const userControllerInstance = factoryUserController(dependencyInjectionMock as IDependencyInjection);
            expect(userControllerInstance).toBeInstanceOf(UserController);
            expect(userControllerInstance['_getAllUsersUseCase']).toBeInstanceOf(GetAllUsersUseCase);
            expect(userControllerInstance['_userPresenter']).toBeInstanceOf(UserPresenter);
        });
    });
});
