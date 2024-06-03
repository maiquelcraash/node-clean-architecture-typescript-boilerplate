import { BaseMocker } from '../BaseMocker.js';
import { IMock } from '../IMock.js';

class ExpressMocker extends BaseMocker implements IMock {
    constructor() {
        super();
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

    /**
     * @override
     */
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
}

const expressMocker = new ExpressMocker();
expressMocker.mock();
export default expressMocker;
