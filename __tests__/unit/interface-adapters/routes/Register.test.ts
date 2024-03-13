jest.mock('../../../../src/interface-adapters/routes/User.js', () => {
    return {
        factoryUserRouter: jest.fn().mockReturnValue('mocked-UserRouter'),
    };
});

import { registerRoutes } from '../../../../src/interface-adapters/routes/Register.js';

describe('src > interface-adapters > routes > Register', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe('When registering routes', () => {
        let serverMock: { useRouter: jest.Mock };

        beforeEach(() => {
            serverMock = { useRouter: jest.fn() };
            // @ts-expect-error injecting mocked values
            registerRoutes(serverMock, 'dependencyInjectionMock');
        });

        test('then should apply user Router to /user path', () => {
            expect(serverMock.useRouter).toHaveBeenNthCalledWith(1, '/user', 'mocked-UserRouter');
        });
    });
});
