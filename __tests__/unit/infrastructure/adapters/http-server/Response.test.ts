import { Response } from '../../../../../src/infrastructure/adapters/http-server/Response.js';
import { IResponse } from '../../../../../src/interface-adapters/ports/http-server/IResponse.js';

describe('infrastructure > adapters > http-server > Response', () => {
    const mockedRawResponse = {
        json: jest.fn(),
        redirect: jest.fn(),
        setHeader: jest.fn(),
        set: jest.fn(),
        end: jest.fn(),
        send: jest.fn(),
        status: jest.fn(),
    };

    let instance: Response, result: IResponse;

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        // @ts-expect-error fake request
        instance = new Response(mockedRawResponse);
    });

    describe('constructor', () => {
        describe('When building an instance', () => {
            test('then should populate internal props correctly', () => {
                expect(instance['_rawResponse']).toEqual(mockedRawResponse);
            });
        });
    });

    describe('json', () => {
        describe('When calling json function', () => {
            beforeEach(() => {
                result = instance.json({ value: 'mock-data' });
            });

            test('then should call correct internal function', () => {
                expect(mockedRawResponse.json).toHaveBeenCalledWith({ value: 'mock-data' });
            });

            test('then should return self', () => {
                expect(result).toEqual(instance);
            });
        });
    });

    describe('redirect', () => {
        describe('When calling redirect function', () => {
            beforeEach(() => {
                instance.redirect('mock-url', 999);
            });

            test('then should call correct internal function', () => {
                expect(mockedRawResponse.redirect).toHaveBeenCalledWith(999, 'mock-url');
            });
        });
        describe('When calling redirect function with URL object', () => {
            beforeEach(() => {
                instance.redirect(new URL('http://test.com'), 999);
            });

            test('then should call correct internal function', () => {
                expect(mockedRawResponse.redirect).toHaveBeenCalledWith(999, 'http://test.com/');
            });
        });
    });

    describe('setHeader', () => {
        describe('When calling setHeader function', () => {
            beforeEach(() => {
                result = instance.setHeader('mock-key', 'mock-value');
            });

            test('then should call correct internal function', () => {
                expect(mockedRawResponse.setHeader).toHaveBeenCalledWith('mock-key', 'mock-value');
            });

            test('then should return self', () => {
                expect(result).toEqual(instance);
            });
        });
    });

    describe('setContentType', () => {
        describe('When calling setContentType function', () => {
            beforeEach(() => {
                result = instance.setContentType('mock-value');
            });

            test('then should call correct internal function', () => {
                expect(mockedRawResponse.set).toHaveBeenCalledWith('Content-type', 'mock-value');
            });

            test('then should return self', () => {
                expect(result).toEqual(instance);
            });
        });
    });

    describe('status', () => {
        describe('When calling status function', () => {
            beforeEach(() => {
                result = instance.status(999);
            });

            test('then should call correct internal function', () => {
                expect(mockedRawResponse.status).toHaveBeenCalledWith(999);
            });

            test('then should return self', () => {
                expect(result).toEqual(instance);
            });
        });
    });

    describe('end', () => {
        describe('When calling end function', () => {
            beforeEach(() => {
                result = instance.end();
            });

            test('then should call correct internal function', () => {
                expect(mockedRawResponse.end).toHaveBeenCalled();
            });

            test('then should return self', () => {
                expect(result).toEqual(instance);
            });
        });
    });


    describe('send', () => {
        describe('When calling send function', () => {
            beforeEach(() => {
                result = instance.send('mock-content');
            });

            test('then should call correct internal function', () => {
                expect(mockedRawResponse.send).toHaveBeenCalledWith('mock-content');
            });

            test('then should return self', () => {
                expect(result).toEqual(instance);
            });
        });
    });
});
