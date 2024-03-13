import { IMock } from '../IMock.js';

class HttpAndHttpsMocker implements IMock {
    public fn: { createServerFn: jest.Mock };

    constructor() {
        this.fn = {
            createServerFn: jest.fn(),
        };
    }


    mock(): void {
        jest.mock('http', () => {
            return {
                default: {
                    createServer: this.fn.createServerFn,
                },
            };
        });

        jest.mock('https', () => {
            return {
                default: {
                    createServer: this.fn.createServerFn,
                },
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

const httpAndHttpsMocker = new HttpAndHttpsMocker();
httpAndHttpsMocker.mock();
export default httpAndHttpsMocker;
