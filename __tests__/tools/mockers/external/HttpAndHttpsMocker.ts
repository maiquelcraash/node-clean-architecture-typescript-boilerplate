import { BaseMocker } from '../BaseMocker.js';
import { IMock } from '../IMock.js';

class HttpAndHttpsMocker extends BaseMocker implements IMock {
    constructor() {
        super();
        this.fn = {
            createServerFn: jest.fn(),
        };
    }

    /**
     * @override
     */
    mock(): void {
        jest.mock('http', () => {
            return {
                createServer: this.fn.createServerFn,
            };
        });

        jest.mock('https', () => {
            return {
                createServer: this.fn.createServerFn,
            };
        });
    }
}

const httpAndHttpsMocker = new HttpAndHttpsMocker();
httpAndHttpsMocker.mock();
export default httpAndHttpsMocker;
