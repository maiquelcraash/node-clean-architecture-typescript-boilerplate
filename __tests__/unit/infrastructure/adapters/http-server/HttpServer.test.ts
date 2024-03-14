/* eslint-disable */
import ExpressMocker from '../../../../tools/mockers/external/ExpressMocker.js';
import BodyParserMocker from '../../../../tools/mockers/external/BodyParserMocker.js';
import HttpAndHttpsMocker from '../../../../tools/mockers/external/HttpAndHttpsMocker.js';
import FsMocker from '../../../../tools/mockers/external/FsMocker.js';
import { HttpServer, HttpServerOptions } from '../../../../../src/infrastructure/adapters/http-server/HttpServer.js';
import { IRequest } from '../../../../../src/interface-adapters/ports/http-server/IRequest.js';
import { IResponse } from '../../../../../src/interface-adapters/ports/http-server/IResponse.js';
/* eslint-enable */

describe('infrastructure > adapters > http-server > HttpServer', () => {
    let instance: HttpServer, listenFn: jest.Mock;

    const mockServerOptions: HttpServerOptions = {
        port: 1234,
        isHttps: false,
        sslKeyPath: 'mockedSSLKeyPath',
        sslCertPath: 'mockedSSLCertPath',
        bodySizeLimit: 'mockedBodySize',
    };

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
        ExpressMocker.reset();
        BodyParserMocker.reset();
        HttpAndHttpsMocker.reset();
        FsMocker.reset();
    });

    beforeEach(() => {
        listenFn = jest.fn().mockImplementation((_port, cb) => {
            cb();
        });
        HttpAndHttpsMocker.fn.createServerFn.mockReturnValue({
            listen: listenFn,
        });

        jest.spyOn(console, 'info').mockImplementation(jest.fn);
    });

    describe('constructor', () => {
        beforeEach(() => {
            BodyParserMocker.fn.json.mockReturnValue('mockJson');
            BodyParserMocker.fn.urlencoded.mockReturnValue('mockEncoder');
            instance = new HttpServer(mockServerOptions);
        });

        describe('When instantiating a server instance', () => {
            test('then it should set internal properties properly', () => {
                expect(instance['_config']).toBe(mockServerOptions);
                expect(instance['_app']).toBeDefined();
                expect(instance['_isStarted']).toBeFalse();
                expect(instance['_isHttps']).toBeFalse();
            });

            test('then it should instantiate Middlewares properly', () => {
                expect(ExpressMocker.fn.use).toHaveBeenCalledTimes(2);
                expect(ExpressMocker.fn.use).toHaveBeenNthCalledWith(1, 'mockJson');
                expect(ExpressMocker.fn.use).toHaveBeenNthCalledWith(2, 'mockEncoder');
                expect(BodyParserMocker.fn.json).toHaveBeenCalledWith({ limit: mockServerOptions.bodySizeLimit });
                expect(BodyParserMocker.fn.urlencoded).toHaveBeenCalledWith({ extended: true });
            });

            test('then should factory a Http server with correct app', () => {
                expect(HttpAndHttpsMocker.fn.createServerFn).toHaveBeenCalled();
                expect(HttpAndHttpsMocker.fn.createServerFn).toHaveBeenCalledWith(instance['_app']);
            });

            test('then should not read key and certification', () => {
                expect(FsMocker.fn.readFileSync).not.toHaveBeenCalled();
            });

            describe('... and server is HTTPS', () => {
                beforeEach(() => {
                    FsMocker.fn.readFileSync.mockReturnValueOnce('mocked-key').mockReturnValue('mocked-cert');

                    instance = new HttpServer({
                        ...mockServerOptions,
                        isHttps: true,
                    });
                });

                test('then should read key and certification files to apply to server with correct app', () => {
                    expect(FsMocker.fn.readFileSync).toHaveBeenCalledTimes(2);
                    expect(FsMocker.fn.readFileSync).toHaveBeenNthCalledWith(1, mockServerOptions.sslKeyPath);
                    expect(FsMocker.fn.readFileSync).toHaveBeenNthCalledWith(2, mockServerOptions.sslCertPath);
                    expect(HttpAndHttpsMocker.fn.createServerFn).toHaveBeenCalled();
                    expect(HttpAndHttpsMocker.fn.createServerFn).toHaveBeenCalledWith({
                        key: 'mocked-key',
                        cert: 'mocked-cert',
                    }, instance['_app']);
                });

                test('then should set _isHttps as true', () => {
                    expect(instance['_isHttps']).toBeTrue();
                });
            });
        });
    });

    describe('start', () => {

        beforeEach(() => {
            instance = new HttpServer(mockServerOptions);
        });

        describe('When starting server', () => {
            beforeEach(() => {
                instance.start();
            });

            test('then should set isStarted internal status as true', () => {
                expect(instance['_isStarted']).toBeTrue();
            });

            test('then should listen to created node server', () => {
                expect(listenFn).toHaveBeenCalled();
                expect(listenFn).toHaveBeenCalledWith(mockServerOptions.port, expect.any(Function));
            });

            test('then should log info to the console', () => {
                expect(console.info).toHaveBeenCalled();
                expect(console.info).toHaveBeenCalledWith('Started HTTP server port', mockServerOptions.port);
            });
        });
    });

    describe('isHttps', () => {
        describe('When server is HTTP and was started', () => {
            beforeEach(() => {
                instance = new HttpServer(mockServerOptions);
                instance.start();
            });

            test('then should return false', () => {
                expect(instance.isHttps()).toBeFalse();
            });
        });

        describe('When server is HTTPs and was started', () => {
            beforeEach(() => {
                instance = new HttpServer({ ...mockServerOptions, isHttps: true });
                instance.start();
            });

            test('then should return true', () => {
                expect(instance.isHttps()).toBeTrue();
            });
        });

        describe('When server was not started', () => {
            beforeEach(() => {
                instance = new HttpServer({ ...mockServerOptions, isHttps: true });
            });

            test('then should return false', () => {
                expect(instance.isHttps()).toBeFalse();
            });
        });
    });

    describe('use', () => {
        let mockCallback: jest.Mock;

        beforeEach(() => {
            mockCallback = jest.fn();
            ExpressMocker.fn.use.mockImplementation((_endpoint, cb) => {
                if (cb && typeof cb === 'function') cb('mock-req', 'mock-res', `mock-next`);
            });
            instance = new HttpServer(mockServerOptions);
        });

        describe('When applying route to server', () => {
            beforeEach(() => {
                instance.use('mocked-path', mockCallback);
            });

            test('then should apply the callback wrapping default req and res to our internal adapters', () => {
                expect(ExpressMocker.fn.use).toHaveBeenCalled();
                expect(ExpressMocker.fn.use).toHaveBeenCalledWith('mocked-path', expect.any(Function));
                expect(mockCallback).toHaveBeenCalled();
                // ensure the request adapters were injected
                expect(mockCallback).toHaveBeenCalledWith(expect.any(IRequest), expect.any(IResponse), 'mock-next');
                expect(mockCallback.mock.calls[0][0]['_rawRequest']).toBe('mock-req');
                expect(mockCallback.mock.calls[0][1]['_rawResponse']).toBe('mock-res');
            });
        });
    });

    describe('useErrorMiddleware', () => {
        let mockCallback: jest.Mock;

        beforeEach(() => {
            mockCallback = jest.fn();
            ExpressMocker.fn.use.mockImplementation((cb) => {
                if (cb && typeof cb === 'function') cb('mock-error', 'mock-req', 'mock-res', `mock-next`);
            });
            instance = new HttpServer(mockServerOptions);
        });

        describe('When applying error middleware to server', () => {
            beforeEach(() => {
                instance.useErrorMiddleware(mockCallback);
            });

            test('then should apply the error handler wrapping default req and res to our internal adapters', () => {
                expect(ExpressMocker.fn.use).toHaveBeenCalled();
                expect(ExpressMocker.fn.use).toHaveBeenCalledWith(expect.any(Function));
                expect(mockCallback).toHaveBeenCalled();
                // ensure the request adapters were injected
                expect(mockCallback).toHaveBeenCalledWith('mock-error', expect.any(IRequest), expect.any(IResponse), 'mock-next');
                expect(mockCallback.mock.calls[0][1]['_rawRequest']).toBe('mock-req');
                expect(mockCallback.mock.calls[0][2]['_rawResponse']).toBe('mock-res');
            });
        });
    });

    describe('useRouter', () => {
        let getRawRouterMockFn: jest.Mock;

        beforeEach(() => {
            getRawRouterMockFn = jest.fn().mockImplementation(() => 'mocked-raw-router');
            instance = new HttpServer(mockServerOptions);
            // @ts-expect-error injecting fake router
            instance.useRouter('mocked-endpoint', {getRawRouter: getRawRouterMockFn});
        });

        test('then should attach endpoint to the raw router', () => {
            expect(ExpressMocker.fn.use).toHaveBeenCalled();
            expect(ExpressMocker.fn.use).toHaveBeenCalledWith('mocked-endpoint', 'mocked-raw-router');
        });
    });

    describe('getRawServer', () => {
        beforeEach(() => {
            instance = new HttpServer(mockServerOptions);
        });

        test('then should retrieve raw server', () => {
            expect(instance.getRawServer()).toEqual(instance['_app']);
        });
    });
});
