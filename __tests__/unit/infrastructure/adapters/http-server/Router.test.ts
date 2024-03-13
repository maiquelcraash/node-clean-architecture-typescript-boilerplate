/* eslint-disable */
import ExpressMocker from '../../../../tools/mockers/external/ExpressMocker.js';
import { Router } from '../../../../../src/infrastructure/adapters/http-server/Router.js';
import { IRequest } from '../../../../../src/interface-adapters/ports/http-server/IRequest.js';
import { IResponse } from '../../../../../src/interface-adapters/ports/http-server/IResponse.js';
/* eslint-enable */
describe('infrastructure > adapters > http-server > Router', () => {
    let instance: Router;

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
        ExpressMocker.reset();
    });

    beforeEach(() => {
        instance = new Router();
        instance['_adaptMiddleware'] = jest.fn().mockReturnValue('mocked-adapted-middleware');
    });

    describe('constructor', () => {
        describe('When instantiating a Router', () => {
            test('then should instantiate local private raw router', () => {
                expect(instance['_rawRouter']).toBeDefined();
            });
        });
    });

    describe('useRouter', () => {
        describe('When calling useRouter', () => {
            const subRouter = new Router();

            beforeEach(() => {
                subRouter.getRawRouter = jest.fn().mockReturnValue('mocked-raw-router');
                instance.useRouter('mocked-path', subRouter);
            });

            test('then should add sub-router raw router to internal router', () => {
                expect(ExpressMocker.fn.routerUse).toHaveBeenCalledWith('mocked-path', 'mocked-raw-router');
            });
        });
    });

    describe('useMiddleware', () => {
        describe('When calling useMiddleware', () => {
            beforeEach(() => {
                // @ts-expect-error fake middleware
                instance.useMiddleware('mocked-middleware');
            });

            test('then should adapt and attach middleware to router', () => {
                expect(ExpressMocker.fn.routerUse).toHaveBeenCalledWith('mocked-adapted-middleware');
            });
        });
    });

    describe('getRawRouter', () => {
        describe('When calling getRawRouter', () => {
            test('then should return internal router', () => {
                expect(instance.getRawRouter()).toEqual(instance['_rawRouter']);
            });
        });
    });

    describe('all', () => {
        describe('When calling all', () => {
            beforeEach(() => {
                // @ts-expect-error fake callback
                instance.all('/my-path', 'mocked-callback');
            });

            test('then should adapt and attach callback to that router', () => {
                expect(ExpressMocker.fn.routerAll).toHaveBeenCalledWith('/my-path', 'mocked-adapted-middleware');
            });
        });
    });

    describe('get', () => {
        describe('When calling get', () => {
            beforeEach(() => {
                // @ts-expect-error fake callback
                instance.get('/my-path', 'mocked-callback');
            });

            test('then should adapt and attach callback to that router', () => {
                expect(ExpressMocker.fn.routerGet).toHaveBeenCalledWith('/my-path', 'mocked-adapted-middleware');
            });
        });
    });

    describe('patch', () => {
        describe('When calling patch', () => {
            beforeEach(() => {
                // @ts-expect-error fake callback
                instance.patch('/my-path', 'mocked-callback');
            });

            test('then should adapt and attach callback to that router', () => {
                expect(ExpressMocker.fn.routerPatch).toHaveBeenCalledWith('/my-path', 'mocked-adapted-middleware');
            });
        });
    });

    describe('put', () => {
        describe('When calling put', () => {
            beforeEach(() => {
                // @ts-expect-error fake callback
                instance.put('/my-path', 'mocked-callback');
            });

            test('then should adapt and attach callback to that router', () => {
                expect(ExpressMocker.fn.routerPut).toHaveBeenCalledWith('/my-path', 'mocked-adapted-middleware');
            });
        });
    });

    describe('post', () => {
        describe('When calling post', () => {
            beforeEach(() => {
                // @ts-expect-error fake callback
                instance.post('/my-path', 'mocked-callback');
            });

            test('then should adapt and attach callback to that router', () => {
                expect(ExpressMocker.fn.routerPost).toHaveBeenCalledWith('/my-path', 'mocked-adapted-middleware');
            });
        });
    });

    describe('delete', () => {
        describe('When calling delete', () => {
            beforeEach(() => {
                // @ts-expect-error fake callback
                instance.delete('/my-path', 'mocked-callback');
            });

            test('then should adapt and attach callback to that router', () => {
                expect(ExpressMocker.fn.routerDelete).toHaveBeenCalledWith('/my-path', 'mocked-adapted-middleware');
            });
        });
    });

    describe('_adaptMiddleware', () => {
        let adaptedMiddleware: (req: unknown, res: unknown, next: () => void) => unknown,
            testCallback: jest.Mock,
            nextFn: jest.Mock;

        describe('When successfully adapting middleware', () => {
            beforeEach(() => {
                instance = new Router();
                testCallback = jest.fn();
                nextFn = jest.fn();
                // @ts-expect-error private function call
                adaptedMiddleware = instance._adaptMiddleware(testCallback);
            });

            test('then should return a function', () => {
                expect(adaptedMiddleware).toBeInstanceOf(Function);
            });

            test('then the returned function should inject our adapters', async () => {
                await adaptedMiddleware('mock-req', 'mock-res', nextFn);
                expect(testCallback).toHaveBeenCalledWith(expect.any(IRequest), expect.any(IResponse), nextFn);
                expect(testCallback.mock.calls[0][0]['_rawRequest']).toBe('mock-req');
                expect(testCallback.mock.calls[0][1]['_rawResponse']).toBe('mock-res');
            });

            test('then should not call next function', () => {
                expect(nextFn).not.toHaveBeenCalled();
            });
        });

        describe('When it fails adapting middleware', () => {
            beforeEach(() => {
                instance = new Router();
                testCallback = jest.fn().mockRejectedValue('mock-error');
                nextFn = jest.fn();
                // @ts-expect-error private function call
                adaptedMiddleware = instance._adaptMiddleware(testCallback);
            });


            test('then should call next with error', async () => {
                await adaptedMiddleware('mock-req', 'mock-res', nextFn);
                expect(nextFn).toHaveBeenCalledWith("mock-error");
            });
        });
    });
});
