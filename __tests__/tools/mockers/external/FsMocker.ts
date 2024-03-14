import { IMock } from '../IMock.js';

class FsMocker implements IMock {
    public fn: { readFileSync: jest.Mock };

    constructor() {
        this.fn = {
            readFileSync: jest.fn(),
        };
    }


    mock(): void {
        jest.mock('fs', () => {
            return {
                readFileSync: this.fn.readFileSync,
            };
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

const fsMocker = new FsMocker();
fsMocker.mock();
export default fsMocker;
