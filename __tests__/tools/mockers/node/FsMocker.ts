import { BaseMocker } from '../BaseMocker.js';
import { IMock } from '../IMock.js';

class FsMocker extends BaseMocker implements IMock {
    constructor() {
        super();
        this.fn = {
            readFileSync: jest.fn(),
        };
    }

    /**
     * @override
     */
    mock(): void {
        jest.mock('fs', () => {
            return {
                readFileSync: this.fn.readFileSync,
            };
        });
    }
}

const fsMocker = new FsMocker();
fsMocker.mock();
export default fsMocker;
