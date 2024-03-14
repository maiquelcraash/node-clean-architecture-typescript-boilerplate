import { IMock } from '../IMock.js';

class ExpressMocker implements IMock {
    public fn: {
        use: jest.Mock,
        routerUse: jest.Mock,
        routerAll: jest.Mock,
        routerGet: jest.Mock,
        routerPatch: jest.Mock,
        routerPut: jest.Mock,
        routerPost: jest.Mock,
        routerDelete: jest.Mock
    };

    constructor() {
        this.fn = {
            use: jest.fn(),
            routerUse: jest.fn(),
            routerAll: jest.fn(),
            routerGet: jest.fn(),
            routerPatch: jest.fn(),
            routerPut: jest.fn(),
            routerPost: jest.fn(),
            routerDelete: jest.fn(),
        };
    };


    mock(): void {
        jest.mock('express', () => {
            const mockedModule = () => {
                return { use: this.fn.use };
            };

            mockedModule.Router = jest.fn().mockReturnValue({
                use: this.fn.routerUse,
                all: this.fn.routerAll,
                get: this.fn.routerGet,
                patch: this.fn.routerPatch,
                put: this.fn.routerPut,
                post: this.fn.routerPost,
                delete: this.fn.routerDelete,
            });

            return mockedModule;
        });
    }

    reset(): void {
        let key: keyof typeof this.fn;
        for (key in this.fn) {
            const func = this.fn[key];
            func.mockClear();
            func.mockReset();
        }
    }
}

const expressMocker = new ExpressMocker();
expressMocker.mock();
export default expressMocker;
