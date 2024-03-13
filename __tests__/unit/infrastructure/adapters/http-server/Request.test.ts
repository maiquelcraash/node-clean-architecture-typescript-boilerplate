import { Request } from '../../../../../src/infrastructure/adapters/http-server/Request.js';

describe('infrastructure > adapters > http-server > Request', () => {
    const mockedRawRequest = {
        params: 'mocked-params',
        body: 'mocked-body',
        query: 'mocked-query',
        method: 'mocked-method',
        ip: 'mocked-ip',
    };

    let instance: Request;

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        // @ts-expect-error fake request
        instance = new Request(mockedRawRequest);
    });

    describe('constructor', () => {
        describe('When building an instance', () => {
            test('then should populate internal props correctly', () => {
                expect(instance['_rawRequest']).toEqual(mockedRawRequest);
            });
        });
    });

    describe('getParams', () => {
        describe('When getting params from request', () => {
            test('then should retrieve raw request\'s params', () => {
                expect(instance.getParams()).toEqual(mockedRawRequest.params);
            });
        });
    });

    describe('getBody', () => {
        describe('When getting body from request', () => {
            test('then should retrieve raw request\'s body', () => {
                expect(instance.getBody()).toEqual(mockedRawRequest.body);
            });
        });
    });

    describe('getQuery', () => {
        describe('When getting query from request', () => {
            test('then should retrieve raw request\'s query', () => {
                expect(instance.getQuery()).toEqual(mockedRawRequest.query);
            });
        });
    });

    describe('getMethod', () => {
        describe('When getting method from request', () => {
            test('then should retrieve raw request\'s method', () => {
                expect(instance.getMethod()).toEqual(mockedRawRequest.method);
            });
        });
    });

    describe('getIp', () => {
        describe('When getting IP from request', () => {
            test('then should retrieve raw request\'s IP', () => {
                expect(instance.getIp()).toEqual(mockedRawRequest.ip);
            });
        });
    });
});

