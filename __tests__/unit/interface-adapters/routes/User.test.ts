jest.mock('../../../../src/interface-adapters/factories/UserControllerFactory.js', () => {
    return {
        factoryUserController: jest.fn(),
    };
});

import { factoryUserController } from '../../../../src/interface-adapters/factories/UserControllerFactory.js';
import { factoryUserRouter } from '../../../../src/interface-adapters/routes/User.js';
import expressMocker from '../../../tools/mockers/external/ExpressMocker.js';

describe('src > interface-adapters > routes > User', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
        expressMocker.reset();
    });

    describe('When creating user router', () => {
        let dependencyInjectionMock: { resolveAdapterConstructor: jest.Mock };
        const RouterMock = jest.fn();

        beforeEach(() => {
            dependencyInjectionMock = { resolveAdapterConstructor: jest.fn().mockReturnValue(RouterMock) };
            RouterMock.prototype.get = jest.fn();

            // @ts-expect-error injecting mocked values
            factoryUserController.mockReturnValue({
                getAllUsers: jest.fn()
            })

            // @ts-expect-error injecting mocked values
            factoryUserRouter(dependencyInjectionMock);
        });

        test('resolve IRouter dependency', () => {
            expect(dependencyInjectionMock.resolveAdapterConstructor).toHaveBeenCalledWith(expect.any(Function));
        });

        test('then should build user controller', () => {
            expect(factoryUserController).toHaveBeenCalledWith(dependencyInjectionMock);
        });

        test('then should add a GET route to "/" path', () => {
            expect(RouterMock.prototype.get).toHaveBeenCalledWith('/', expect.any(Function))
        });
    });
});
